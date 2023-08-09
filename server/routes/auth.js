var express = require("express");
var router = express.Router();
const { Signup, Login } = require("../controller/authController");
const { userVerification } = require("../middlewares/authMiddleware");

const cors = require('cors');

router.options('*', cors())
router.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", process.env.FRONTEND_URL); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Resource: https://www.freecodecamp.org/news/how-to-secure-your-mern-stack-application/
router.post('/', userVerification);
router.post('/login', Login);
router.post("/signup", Signup);

module.exports = router;