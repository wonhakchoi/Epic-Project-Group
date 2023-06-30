const express = require('express');
const router = express.Router();

const COLLECTION_IMG = "https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=580&q=80"

router.get('/', function (req, res) {
    return res.send([
        {
            id: 'ca', name: "Collection A", img: COLLECTION_IMG, restaurants: [
                {
                    id: 'rainorshine',
                    name: "Rain or Shine Ice Cream",
                    description: "Ice Cream",
                    location: "6001 University Blvd, Vancouver, BC",
                    openingHours: "12:00 PM to 10:00 PM",
                    rating: 4.6,
                },
                {
                    id: 'mcdonalds',
                    name: "McDonald's",
                    description: "Fast food restaurant",
                    location: "5728 University Blvd, Vancouver, BC",
                    openingHours: "Open 24 hours",
                    rating: 3.4,
                }
            ]
        },
        {
            id: 'cb', name: "Collection B", img: COLLECTION_IMG, restaurants: [
                {
                    id: 'browns',
                    name: "Browns Crafthouse UBC",
                    description: "Pub",
                    location: "6111 University Blvd, Vancouver, BC",
                    openingHours: "11AM to 12AM",
                    rating: 4.3,
                }
            ]
        },
    ]);
})

module.exports = router;