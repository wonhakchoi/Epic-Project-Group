var axios = require("axios");
var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
require("dotenv").config();

router.get("/:searchTerm", async (req, res, next) => {
    let searchTerm = req.params.searchTerm;
    searchTerm = searchTerm.replace(/ /g, '+');
    const {data} = await axios.get(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=vancouver+${searchTerm}&type=food&key=${process.env.GOOGLE_PLACES_API_KEY}`);
    for (let i = 0; i < data.results.length; i++) {
        if ("photos" in data.results[i]) {
            let imageURL = await axios.get(
                `https://maps.googleapis.com/maps/api/place/photo?photoreference=${data.results[i].photos[0].photo_reference}&maxheight=500&maxwidth=500&key=${process.env.GOOGLE_PLACES_API_KEY}` 
            );
            data.results[i]["picture_icon"] = imageURL.config.url;
        } else {
            data.results.pop(i);
        }
    }
    res.json(data);
});

module.exports = router;