var axios = require("axios");
var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
require("dotenv").config();

router.get("/:searchTerm", async (req, res, next) => {
    let searchTerm = req.params.searchTerm;
    searchTerm = searchTerm.replace(/ /g, '+');
    try {
        console.log(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=vancouver+${searchTerm}&type=food&key=${process.env.GOOGLE_PLACES_API_KEY}`);
        const {data} = await axios.get(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=vancouver+${searchTerm}&type=food&key=${process.env.GOOGLE_PLACES_API_KEY}`);
        res.json(data);
    } catch (err) {
        next(err);
    }
});

module.exports = router;