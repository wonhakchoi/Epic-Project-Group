const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
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
        friends: {
            type: [String],
            default: [],
        },
        outgoingRequests: {
            type: [String],
            default: [],
        },
        incomingRequests: {
            type: [String],
            default: [],
        },
    },
    { collection: "users" }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
