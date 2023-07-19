const express = require('express');
const {Cauliflower} = require("../database/models/cauliflowerModel");
const router = express.Router();
const axios = require("axios");


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

    // let restaurants = await Restaurant.find().exec();

    if (collection.restaurants.length === 0) {
        return res.send(response);
    }

    for (let r of collection.restaurants) {
        let restaurant;
        try {
            restaurant = (await axios.get(
                `https://maps.googleapis.com/maps/api/place/details/json?place_id=${r}&key=${process.env.GOOGLE_PLACES_API_KEY}`
            )).data.result
            console.log(restaurant)
        } catch (e) {
            console.error(e)
        }

        response.push(restaurant);
    }

    // for (let r of restaurants) {
    //     if (collection.restaurants.includes(r._id)) {
    //         response.push(r);
    //     }
    // }
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

// POST make new collection
router.post('/', async (req, res) => {

    let collection = {
        name: req.body.name,
        img: req.body.img,
        restaurants: []
    }
    let newCauliflower = new Cauliflower(collection)
    try {
        newCauliflower.save();
    } catch (e) {
        console.error(e)
    }
    res.send(collection);
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
        // console.log(collection);
    } catch (e) {
        console.error(e)
    }

    return res.send(collection);
})

module.exports = router;