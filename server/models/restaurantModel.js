const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    openingHours: {
        type: String,
        required: true,
    },
});

const Restaurant = mongoose.model("Restaurant", restaurantSchema);

module.exports = Restaurant;
