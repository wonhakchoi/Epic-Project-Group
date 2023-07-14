var express = require("express");
var router = express.Router();
var Restaurant = require("../models/restaurantModel");

/* GET restaurants listing */
router.get("/", async (req, res, next) => {
    try {
        const restaurants = await Restaurant.find({});
        res.send(restaurants);
    } catch (error) {
        console.error(error);
    }
});
module.exports = router;
