const User = require("../database/models/authModel");
const { createSecretToken } = require("../util/secretToken");
const bcrypt = require("bcryptjs");

module.exports.Signup = async (req, res, next) => {
    try {
        const { email, password, createdAt } = req.body;
        if (!email || !password) {
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
                });;
        }

        //Encrypt user password
        // encryptedPassword = await bcrypt.hash(password, 10);
        // console.log(encryptedPassword);

        const user = await User.create({ email, password, createdAt });
        const token = createSecretToken(user._id);
        res.cookie("token", token, {
            withCredentials: true,
            httpOnly: false,
        });
        res
            .status(201)
            .json({ message: "User signed in successfully", success: true, user });
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
        res.status(201).json({ message: "User logged in successfully", success: true });
        next()
    } catch (error) {
        console.error(error);
    }
}