var express = require("express");
var router = express.Router();
var Auth = require("../database/models/authModel");

router.post("/login", async (req, res) => {
    const { email, password } = req.body

    try {
        const check = await Auth.findOne({ email: email });

        if (check) {
            const pass = check.password;
            if (password == pass) {
                // res.json("exist");
                res.json("You have logged in successfully!");
            } else {
                // res.json("doesnotmatch");
                res.status(401).send({
                    message: 'The email and password do not match. Please try again.'
                 });;
            }
            
        }
        else {
            res.status(401).send({
                message: 'This email does not exist in our database. Sign up!'
             });;
        }

    }
    catch (e) {
        res.json("fail")
    }

})

router.post("/signup", async (req, res) => {
    const { email, password } = req.body

    const data = {
        email: email,
        password: password
    }

    try {
        const check = await Auth.findOne({ email: email })

        if (check) {
            // USER ALREADY EXISTS IN DATABASE
            res.status(401).send({
                message: 'This email is already in use! Log in or sign up with a new email.'
             });;
        }
        else {
            res.json("You have signed up successfully!");
            await Auth.insertMany([data]);
        }

    }
    catch (e) {
        res.json("fail")
    }

})

module.exports = router;