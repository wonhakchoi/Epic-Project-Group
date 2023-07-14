const express = require('express');
const router = express.Router();
const sampleCollection = require('../data/sampleCollections.js')

router.get('/', function (req, res) {
    return res.send(sampleCollection)
})

module.exports = router;