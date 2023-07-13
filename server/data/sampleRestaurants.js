// sample data for restaurants

// restaurants for search: not present in db

const sampleSearchRestaurants = [
    {
        "name": "Tim Hortons",
        "description": "Canadian chain for signature premium-blend coffee",
        "location": "5965 Student Union Blvd, Vancouver, BC",
        "openingHours": "7:00 AM to 10:00 PM",
        "placesId": "timhortons"
    },
    {
        "name": "Starbucks",
        "description": "Seattle-based coffeehouse chain",
        "location": "Technical Enterprise Facility, 6190 Agronomy Rd #3, Vancouver, BC",
        "openingHours": "7:00 AM to 7:00 PM",
        "placesId": "starbucks"
    },
    {
        "name": "Honolulu Coffee False Creek",
        "description": "Honolulu Coffee",
        "location": "97 W 2nd Ave, Vancouver, BC V5Y 1B1",
        "openingHours": "8:00 AM to 5:00 PM",
        "placesId": "honolulu"
    }


]

// restaurants present in db

const sampleDBRestaurants = [
    {
        "name": "Rain or Shine Ice Cream",
        "description": "Ice Cream",
        "location": "6001 University Blvd, Vancouver, BC",
        "openingHours": "12:00 PM to 10:00 PM",
        "placeId": "rainorshine"
    },
    {
        "name": "McDonald's",
        "description": "Fast food restaurant",
        "location": "5728 University Blvd, Vancouver, BC",
        "openingHours": "Open 24 hours",
        "placeId": "mcdonalds"
    }, {
        "name": "Browns Crafthouse UBC",
        "description": "Pub",
        "location": "6111 University Blvd, Vancouver, BC",
        "openingHours": "11AM to 12PM",
        "placeId": "browns"
    },
    {
        "name": "Duffin's Donuts",
        "description": "Heaven on Earth",
        "location": "1391 E 41st Ave, Vancouver, BC",
        "openingHours": "6AM to 12PM",
        "placeId": "duffins"
    }
]

// https://stackoverflow.com/questions/8595509/how-do-you-share-constants-in-nodejs-modules

module.exports = Object.freeze({
    sampleSearchRestaurants: sampleSearchRestaurants,
    sampleDBRestaurants: sampleDBRestaurants
})