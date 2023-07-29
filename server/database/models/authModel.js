const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const authSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Your email address is required"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Your password is required"],
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
});

// hash password
authSchema.pre("save", async function () {
    this.password = await bcrypt.hash(this.password, 12);
});
const Auth = mongoose.model("Auth", authSchema);

module.exports = Auth;