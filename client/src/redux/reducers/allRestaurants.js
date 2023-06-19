/**
 * Represents all ratings on the site
 *
 * id: {
 *      name: "Duffin's Donuts",
 *      description: "Heaven on Earth",
 *      location: "1391 E 41st Ave, Vancouver, BC",
 *      openingHours: "6AM to 12PM",
 * }
 *
 */

const initialRestaurants = {
    1: {
        name: "Rain or Shine Ice Cream",
        description: "Ice Cream",
        location: "6001 University Blvd, Vancouver, BC",
        openingHours: "12:00 PM to 10:00 PM",
    },
    2: {
        name: "McDonald's",
        description: "Fast food restaurant",
        location: "5728 University Blvd, Vancouver, BC",
        openingHours: "Open 24 hours",
    },
    3: {
        name: "Browns Crafthouse UBC",
        description: "Pub",
        location: "6111 University Blvd, Vancouver, BC",
        openingHours: "11AM to 12PM",
    },
    4: {
        name: "Duffin's Donuts",
        description: "Heaven on Earth",
        location: "1391 E 41st Ave, Vancouver, BC",
        openingHours: "6AM to 12PM",
    },
};

const allRestaurants = (restaurants = initialRestaurants, action) => {
    switch (action.type) {
        default:
            return restaurants;
    }
};

export default allRestaurants;
