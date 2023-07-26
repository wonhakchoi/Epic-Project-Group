const mongoose = require("mongoose");

const ratingSchema = new mongoose.Schema(
    {
        userID: {
            type: String,
            required: true,
        },
        restaurantID: {
            type: String,
            required: true,
        },
        score: {
            type: Number,
            required: true,
        },
        comments: {
            type: String,
        },
    },
    { collection: "ratings", timestamps: true }
);

const Rating = mongoose.model("Rating", ratingSchema);

module.exports = { Rating };
