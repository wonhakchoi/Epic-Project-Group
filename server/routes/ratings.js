var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
var { Rating } = require("../database/models/ratingModel");

/* GET all ratings, sorted from latest to earliest creation */
router.get("/allRatings/:skip/:limit", async (req, res, next) => {
    const { skip, limit } = req.params;
    try {
        const ratingSection = await Rating.find({}).sort({ createdAt: -1 }).skip(skip).limit(limit);
        const count = await Rating.countDocuments();
        res.status(200).send({ ratings: ratingSection, databaseSize: count });
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
});

/* GET all ratings */
router.get("/allRatings", async (req, res, next) => {
    try {
        const ratingSection = await Rating.find({});
        res.status(200).send({ ratings: ratingSection });
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
});

/* GET rating by ratingID  */
router.get("/:ratingID", async (req, res, next) => {
    let { ratingID } = req.params;
    try {
        const rating = await Rating.findById(ratingID);
        res.status(200).send(rating);
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
});

/* GET only ratings of friends, sorted from latest to earliest creation */
router.get("/friendRatings/:skip/:limit", async (req, res, next) => {
    const { skip, limit } = req.params;
    const friendIDs = req.query.friendIDs;

    console.log(friendIDs);

    try {
        const ratingSection = await Rating.find({ userID: { $in: friendIDs } })
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);
        const count = await Rating.countDocuments({ userID: { $in: friendIDs } });
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
        const userRatings = await Rating.find({ userID }).sort({ createdAt: -1 });
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
        const restaurantRatings = await Rating.find({ restaurantID }).sort({ createdAt: -1 });
        res.status(200).send(restaurantRatings);
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
});

/* POST new user rating on a specific restaurant */
router.post("/:userID/:restaurantID", async (req, res, next) => {
    let { userID, restaurantID } = req.params;
    let { score, comments, restaurantName } = req.body;
    try {
        const existingRating = await Rating.findOne({ userID, restaurantID });
        if (existingRating) {
            res.status(409).json({ error: "Rating already exists for this user and restaurant" });
        } else {
            const newRating = new Rating({
                userID,
                restaurantID,
                score,
                comments,
                restaurantName,
            });
            await newRating.save();
            res.status(201).json(newRating);
        }
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
                $set: { createdAt: new Date() },
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

/* UPDATE existing rating PUT */
router.put("/:ratingID", async (req, res, next) => {
    let { ratingID } = req.params;
    let { score, comments } = req.body;
    var ratingObjectID = new mongoose.Types.ObjectId(ratingID);
    try {
        const updatedRatingQuery = Rating.findOneAndUpdate(
            ratingObjectID,
            {
                $set: { 
                    score: score,
                    comments: comments,
                    createdAt: new Date() 
                },
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
