var express = require("express");
var router = express.Router();
const { Signup, Login } = require("../controller/authController");
const { userVerification } = require("../middlewares/authMiddleware");

const cors = require('cors');

router.options('*', cors())
router.use(function (req, res, next) {
    // res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
    // res.header("Access-Control-Allow-Origin", /\.easy-eats-frontend.onrender\.com$/); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Origin", "https://easy-eats-frontend.onrender.com"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Resource: https://www.freecodecamp.org/news/how-to-secure-your-mern-stack-application/

router.post('/', userVerification);
router.post('/login', Login);
router.post("/signup", Signup);

// router.post("/login", async (req, res) => {
//     const { email, password } = req.body

//     try {
//         const check = await Auth.findOne({ email: email });

//         if (check) {
//             const pass = check.password;
//             if (password == pass) {
//                 // res.json("exist");
//                 res.json("You have logged in successfully!");
//             } else {
//                 // res.json("doesnotmatch");
//                 res.status(401).send({
//                     message: 'The email and password do not match. Please try again.'
//                  });;
//             }
            
//         }
//         else {
//             res.status(401).send({
//                 message: 'This email does not exist in our database. Sign up!'
//              });;
//         }

//     }
//     catch (e) {
//         res.json("fail")
//     }

// })



// router.post("/signup", async (req, res) => {
//     const { email, password } = req.body

//     const data = {
//         email: email,
//         password: password
//     }

//     try {
//         const check = await Auth.findOne({ email: email })

//         if (check) {
//             // USER ALREADY EXISTS IN DATABASE
//             res.status(401).send({
//                 message: 'This email is already in use! Log in or sign up with a new email.'
//              });;
//         }
//         else {
//             res.json("You have signed up successfully!");
//             await Auth.insertMany([data]);
//         }

//     }
//     catch (e) {
//         res.json("fail")
//     }

// })

module.exports = router;