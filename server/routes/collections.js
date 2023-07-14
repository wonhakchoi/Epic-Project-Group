const express = require('express');
const {Cauliflower} = require("../database/models/cauliflowerModel");
const router = express.Router();
const {Restaurant} = require("../database/models/restaurantModel");


// GET all collections
router.get('/', async (req, res) => {
    const collections = await Cauliflower.find();
    return res.send(collections);
})

// GET information for a single collection
router.get('/:collectionId', async function (req, res) {
    let cId = req.params.collectionId;
    const collection = await Cauliflower.find({"_id" : cId});
    return res.send(collection);
})

// GET array of restaurants for a collection
router.get('/:collectionId/restaurants', async (req, res) => {
    let cId = req.params.collectionId;
    // console.log("cId:" + cId);
    const collection = await Cauliflower.findById(cId).exec();
    // console.log(JSON.stringify(collection));
    let restaurants = await Restaurant.find().exec();
    // console.log(restaurants)
    let response = [];
    for (let r of restaurants) {
        // console.log("restaurant" + JSON.stringify(r))
        // console.log("rid:" + r._id);
        if (collection.restaurants.includes(r._id)) {
            response.push(r);
        }
    }
    // console.log(response);
    return res.send(response);
})

module.exports = router;