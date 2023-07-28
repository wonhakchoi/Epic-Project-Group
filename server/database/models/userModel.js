const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
    {
        createdAt: {
            type: Date,
            default: new Date(),
        },
        email: {
            type: String,
            required: [true, "Your email address is required"],
            unique: true,
        },
        password: {
            type: String,
            required: [true, "Your password is required"],
        },
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        biography: {
            type: String,
            default: "",
        },
        ratedRestaurants: {
            type: Map,
            of: Number,
            default: {},
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

// hash password
userSchema.pre("save", async function () {
    this.password = await bcrypt.hash(this.password, 12);
});
const User = mongoose.model("User", userSchema);

module.exports = { User };
