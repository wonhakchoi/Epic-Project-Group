const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    biography: {
        type: String,
    },
    ratedRestaurants: {
        type: Map,
        of: Number,
    },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
