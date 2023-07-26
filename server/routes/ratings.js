var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
var { Rating } = require("../database/models/ratingModel");

/* GET all ratings, sorted from latest to earliest creation */
router.get("/:skip/:limit", async (req, res, next) => {
    const { skip, limit } = req.params;
    try {
        // const ratingSection = await Rating.find({}).sort({ createdAt: -1 }).skip(skip).limit(limit);
        const ratingSection = await Rating.find({}).sort({ _id: -1 }).skip(skip).limit(limit);
        const count = await Rating.countDocuments();
        res.status(200).send({ ratings: ratingSection, databaseSize: count });
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
});

/* GET ratings of a specific user */
router.get("/userRatings/:userID", async (req, res, next) => {
    let { userID } = req.params;
    try {
        const userRatings = await Rating.find({ userID });
        res.status(200).send(userRatings);
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
});

/* GET ratings of a specific restaurant */
router.get("/restaurantRatings/:restaurantID", async (req, res, next) => {
    let { restaurantID } = req.params;
    try {
        const restaurantRatings = await Rating.find({ restaurantID });
        res.status(200).send(restaurantRatings);
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
});

/* POST new user rating on a specific restaurant */
router.post("/:userID/:restaurantID", async (req, res, next) => {
    let { userID, restaurantID } = req.params;
    let { score, comments } = req.body;
    try {
        const newRating = new Rating({
            userID,
            restaurantID,
            score,
            comments,
        });
        await newRating.save();
        res.status(201).json(newRating);
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
});

/* UPDATE existing rating */
router.post("/:ratingID", async (req, res, next) => {
    let { ratingID } = req.params;
    ratingObjectID = new mongoose.Types.ObjectId(ratingID.toString());
    let { score, comments } = req.body;
    try {
        const updatedRatingQuery = Rating.findOneAndUpdate(
            { _id: ratingObjectID },
            {
                $set: { score: score },
                $set: { comments: comments },
            },
            { new: true, upsert: false }
        );
        const updatedRating = await updatedRatingQuery.exec();
        res.status(201).json(updatedRating);
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
});

/* UPDATE existing rating */
router.put("/:ratingID", async (req, res, next) => {
    let { ratingID } = req.params;
    ratingObjectID = new mongoose.Types.ObjectId(ratingID.toString());
    let { score, comments } = req.body;
    try {
        const updatedRatingQuery = Rating.findOneAndUpdate(
            { _id: ratingObjectID },
            {
                $set: { score: score },
                $set: { comments: comments },
            },
            { new: true, upsert: false }
        );
        const updatedRating = await updatedRatingQuery.exec();
        res.status(201).json(updatedRating);
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
});

/* DELETE existing rating */
router.delete("/:ratingID", async (req, res, next) => {
    let { ratingID } = req.params;
    ratingObjectID = new mongoose.Types.ObjectId(ratingID.toString());
    try {
        const deletedRatingQuery = Rating.findOneAndDelete({ _id: ratingObjectID });
        const deletedRating = await deletedRatingQuery.exec();
        res.status(201).json(deletedRating);
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
});

module.exports = router;
