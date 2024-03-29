const express = require('express');
const {Cauliflower} = require("../database/models/cauliflowerModel");
const router = express.Router();
const axios = require("axios");
const {User} = require("../database/models/userModel");

// GET list of collections of friends
router.get('/friends/:userId', async (req, res) => {
    const uId = req.params.userId;
    let user = await User.findById(uId).exec();
    let friends = user["friends"];
    let collections = [];
    for (let f of friends) {
        let c = null;
        let friendName = null;
        try {
            c = await Cauliflower.findOne({userId: f}).exec();
            let friend = await User.findById(f).exec();
            friendName = friend.firstName;
        } catch (e) {
            console.error(e);
        }
        if (c) {
            collections.push({friendName: friendName, collection: c});
        }
    }

    return res.send(collections);
})

// PATCH change pin status
router.patch('/pin/:collectionId', async (req, res) => {
    const cId = req.params.collectionId;
    const isPinned = req.body.isPinned;
    let cauliflower;
    try {
        cauliflower = await Cauliflower.findByIdAndUpdate(cId, {pinned: isPinned}).exec();
    } catch (e) {
        console.error(e)
    }
    return res.send(cauliflower);
})

// GET all pinned collections for user
router.get('/pinned/:userId', async (req, res) => {
    const uId = req.params.userId;
    let collections = [];
    try {
        collections = await Cauliflower.find({userId: uId, pinned: true}).exec();
    } catch (e) {
        console.error(e);
    }
    return res.send(collections);
})

// POST new collection
router.post('/', async (req, res) => {

    let collection = {
        name: req.body.name,
        img: req.body.img,
        restaurants: [],
        userId: req.body.userId
    }
    let newCauliflower = new Cauliflower(collection)
    try {
        newCauliflower.save();
    } catch (e) {
        console.error(e)
    }
    res.send(collection);
})


// GET user collections
router.get('/user/:userId', async (req, res) => {
    let collections = [];
    const uId = req.params.userId;
    try {
        collections = await Cauliflower.find({userId: uId}).exec();
    } catch (e) {
        console.error(e)
    }
    return res.send(collections);
})

// GET all collections
router.get('/', async (req, res) => {
    let collections = []
    try {
        collections = await Cauliflower.find()
    } catch (e) {
        console.error(e)
    }
    return res.send(collections);
})

// DELETE collection
router.delete('/:collectionId', async (req, res) => {
    let cId = req.params.collectionId;
    try {
        await Cauliflower.findOneAndDelete({_id: cId});
    } catch (e) {
        console.error(e);
    }
    return res.send();
})

// GET information for a single collection
router.get('/:collectionId', async function (req, res) {
    let cId = req.params.collectionId;
    let collection;
    try {
        collection = await Cauliflower.findById(cId).exec();
    } catch (e) {
        console.error(e);
    }

    return res.send(collection);

})

// GET array of restaurants for a collection
router.get('/:collectionId/restaurants', async (req, res) => {
    let cId = req.params.collectionId;
    const collection = await Cauliflower.findById(cId).exec();
    let response = [];

    if (collection.restaurants.length === 0) {
        return res.send(response);
    }

    for (let r of collection.restaurants) {
        let restaurant;
        try {
            restaurant = (await axios.get(
                `https://maps.googleapis.com/maps/api/place/details/json?place_id=${r}&key=${process.env.GOOGLE_PLACES_API_KEY}`
            )).data.result
            // console.log(restaurant)
        } catch (e) {
            console.error(e)
        }

        response.push(restaurant);
    }

    return res.send(response);
})

// DELETE restaurant from a collection

router.delete('/:collectionId/:restaurantId/', async (req, res) => {
    let cId = req.params.collectionId;
    let rId = req.params.restaurantId;
    try {
        await Cauliflower.findByIdAndUpdate(cId,
            {"$pull": {"restaurants": rId}}
        )
    } catch (e) {
        console.error(e)
    }
    return res.send({})

})

// PUT add restaurant to collection
router.put('/:collectionId/:restaurantId/', async (req, res) => {
    let cId = req.params.collectionId;
    let rId = req.params.restaurantId;
    try {
        await Cauliflower.findByIdAndUpdate(cId,
            {
                '$push': {
                    "restaurants": rId
                }
            })
    } catch (e) {
        console.error(e)
    }

    let collection;
    try {
        collection = await Cauliflower.findById(cId).exec();
    } catch (e) {
        console.error(e)
    }

    return res.send(collection);
})

module.exports = router;