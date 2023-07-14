const mongoose = require("mongoose");

const cauliflowerSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        img: {
            type: String,
            required: true,
        },
        // Array of restaurant ids
        restaurants: {
            type: [String],
            required: true
        },
        userId: {
            type: String,
            required: false
        }
    },
    { collection: "cauliflowers" }
);

const Cauliflower = mongoose.model("Cauliflower", cauliflowerSchema);

module.exports = {Cauliflower};