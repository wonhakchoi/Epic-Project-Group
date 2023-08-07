var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
var { User } = require("../database/models/userModel");

/*
MONGODB COMMANDS
$pull: { array: value } - Removes value from array
$addToSet: { array: value } - Adds value to the array, and avoids duplicates
returnNewDocument: true - Set the `new` option to true to return the updated user document
*/

/* GET users listing */
router.get("/", async (req, res, next) => {
    try {
        // const users = await User.find({}).select("_id name biography ratedRestaurants");
        const users = await User.find({});
        res.send(users);
    } catch (error) {
        console.error(error);
    }
});

router.get("/:userID", async (req, res, next) => {
    let { userID } = req.params;
    const userObjectID = new mongoose.Types.ObjectId(userID.toString());
    try {
        const user = await User.find({ _id: userObjectID });
        res.send(user);
    } catch (error) {
        console.error(error);
    }
});

/* PUT incoming to friend */
router.put("/acceptIncoming/:userID/:otherID", async (req, res, next) => {
    let { userID, otherID } = req.params;
    userObjectID = new mongoose.Types.ObjectId(userID.toString());
    otherObjectID = new mongoose.Types.ObjectId(otherID.toString());
    try {
        const userQuery = User.findOneAndUpdate(
            { _id: userObjectID },
            {
                $pull: { incomingRequests: otherID },
                $addToSet: { friends: otherID },
            },
            { new: true, upsert: true }
        );
        const otherQuery = User.findOneAndUpdate(
            { _id: otherObjectID },
            {
                $pull: { outgoingRequests: userID },
                $addToSet: { friends: userID },
            },
            { new: true, upsert: true }
        );
        const [user, other] = await Promise.all([userQuery.exec(), otherQuery.exec()]);
        res.status(200).send(user);
    } catch (error) {
        console.error(error);
        res.status(400).send(`Error: ${error}`);
    }
});

/* PUT incoming to stranger */
router.put("/rejectIncoming/:userID/:otherID", async (req, res, next) => {
    let { userID, otherID } = req.params;
    userObjectID = new mongoose.Types.ObjectId(userID.toString());
    otherObjectID = new mongoose.Types.ObjectId(otherID.toString());
    try {
        const userQuery = User.findOneAndUpdate(
            { _id: userObjectID },
            {
                $pull: { incomingRequests: otherID },
            },
            { new: true, upsert: true }
        );
        const otherQuery = User.findOneAndUpdate(
            { _id: otherObjectID },
            {
                $pull: { outgoingRequests: userID },
            },
            { new: true, upsert: true }
        );
        const [user, other] = await Promise.all([userQuery.exec(), otherQuery.exec()]);
        res.status(200).send(user);
    } catch (error) {
        console.error(error);
        res.status(400).send(`Error: ${error}`);
    }
});

/* PUT stranger to outgoing */
router.put("/sendOutgoing/:userID/:otherID", async (req, res, next) => {
    let { userID, otherID } = req.params;
    userObjectID = new mongoose.Types.ObjectId(userID.toString());
    otherObjectID = new mongoose.Types.ObjectId(otherID.toString());
    try {
        const userQuery = User.findOneAndUpdate(
            { _id: userObjectID },
            {
                $addToSet: { outgoingRequests: otherID },
            },
            { new: true, upsert: true }
        );
        const otherQuery = User.findOneAndUpdate(
            { _id: otherObjectID },
            {
                $addToSet: { incomingRequests: otherID },
            },
            { new: true, upsert: true }
        );
        const [user, other] = await Promise.all([userQuery.exec(), otherQuery.exec()]);
        res.status(200).send(user);
    } catch (error) {
        console.error(error);
        res.status(400).send(`Error: ${error}`);
    }
});

/* PUT outgoing to stranger */
router.put("/cancelOutgoing/:userID/:otherID", async (req, res, next) => {
    let { userID, otherID } = req.params;
    userObjectID = new mongoose.Types.ObjectId(userID.toString());
    otherObjectID = new mongoose.Types.ObjectId(otherID.toString());
    try {
        const userQuery = User.findOneAndUpdate(
            { _id: userObjectID },
            {
                $pull: { outgoingRequests: otherID },
            },
            { new: true, upsert: true }
        );
        const otherQuery = User.findOneAndUpdate(
            { _id: otherObjectID },
            {
                $pull: { incomingRequests: userID },
            },
            { new: true, upsert: true }
        );
        const [user, other] = await Promise.all([userQuery.exec(), otherQuery.exec()]);
        res.status(200).send(user);
    } catch (error) {
        console.error(error);
        res.status(400).send(`Error: ${error}`);
    }
});

/* PUT friend to stranger */
router.put("/unfriend/:userID/:otherID", async (req, res, next) => {
    let { userID, otherID } = req.params;
    userObjectID = new mongoose.Types.ObjectId(userID.toString());
    otherObjectID = new mongoose.Types.ObjectId(otherID.toString());
    try {
        const userQuery = User.findOneAndUpdate(
            { _id: userObjectID },
            {
                $pull: { friends: otherID },
            },
            { new: true, upsert: true }
        );
        const otherQuery = User.findOneAndUpdate(
            { _id: otherObjectID },
            {
                $pull: { friends: userID },
            },
            { new: true, upsert: true }
        );
        const [user, other] = await Promise.all([userQuery.exec(), otherQuery.exec()]);
        res.status(200).send(user);
    } catch (error) {
        console.error(error);
        res.status(400).send(`Error: ${error}`);
    }
});

module.exports = router;
