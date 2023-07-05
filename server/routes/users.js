var express = require("express");
var router = express.Router();
var User = require("../models/userModel");

/* GET users listing. */
router.get("/", async (req, res, next) => {
    const users = await User.find({});
    res.send(users);
});

module.exports = router;
