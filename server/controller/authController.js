// const User = require("../database/models/authModel");
var { User } = require("../database/models/userModel");
const { createSecretToken } = require("../util/secretToken");
const bcrypt = require("bcryptjs");

module.exports.Signup = async (req, res, next) => {
    try {
        const { email, password, firstName, lastName, createdAt } = req.body;
        if (!email || !password || !firstName || !lastName) {
            // return res.json({ message: 'All fields are required' })
            return res
                .status(401)
                .json({
                    message: 'All fields are required'
                });
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            // return res.json({ message: "User already exists" });
            return res
                .status(401)
                .json({
                    message: 'This email is already in use! Log in or sign up with a new email.'
                })
        }

        const user = await User.create({ email, password, firstName, lastName, createdAt });
        const token = createSecretToken(user._id);
        res.cookie("token", token, {
            withCredentials: true,
            httpOnly: false,
        });
        res
            .status(201)
            .json({ message: "User signed in successfully", success: true, user, token: token});
        next();
    } catch (error) {
        console.error(error);
    }
};

module.exports.Login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            // return res.json({ message: 'All fields are required' })
            return res
                .status(401)
                .json({
                    message: 'All fields are required'
                });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res
                .status(401)
                .json({
                    message: 'Incorrect email or password'
                });
        }
        const auth = await bcrypt.compare(password, user.password)
        if (!auth) {
            return res
                .status(401)
                .json({
                    message: 'Incorrect email or password'
                });
        }
        const token = createSecretToken(user._id);
        res.cookie("token", token, {
            withCredentials: true,
            httpOnly: false,
        });
        console.log("authController.js");
        console.log(user);
        res.status(201).json({ message: "User logged in successfully", success: true, user,  token: token});
        next()
    } catch (error) {
        console.error(error);
    }
}