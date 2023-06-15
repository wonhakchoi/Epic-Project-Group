let initialFriends = [
    {
        id: 1,
        name: "Cedric Pulmano",
        biography: "UBC student",
        rated_restaurants: [
            {
                id: 1,
                name: "Rain or Shine Ice Cream",
                description: "Ice Cream",
                location: "6001 University Blvd, Vancouver, BC",
                openingHours: "12:00 PM to 10:00 PM",
                rating: 4.6,
            },
            {
                id: 2,
                name: "McDonald's",
                description: "Fast food restaurant",
                location: "5728 University Blvd, Vancouver, BC",
                openingHours: "Open 24 hours",
                rating: 3.4,
            },
        ],
    },
    {
        id: 2,
        name: "Wonhak Choi",
        biography: "UBC student",
        rated_restaurants: [
            {
                id: 3,
                name: "Browns Crafthouse UBC",
                description: "Pub",
                location: "6111 University Blvd, Vancouver, BC",
                openingHours: "11AM to 12AM",
                rating: 4.3,
            },
        ],
    },
    {
        id: 3,
        name: "Wendy Shen",
        biography: "UBC student",
        rated_restaurants: [
            {
                id: 2,
                name: "McDonald's",
                description: "Fast food restaurant",
                location: "5728 University Blvd, Vancouver, BC",
                openingHours: "Open 24 hours",
                rating: 3.4,
            },
        ],
    },
    {
        id: 4,
        name: "Tammy Kim",
        biography: "UBC student",
        rated_restaurants: [
            {
                id: 3,
                name: "Browns Crafthouse UBC",
                description: "Pub",
                location: "6111 University Blvd, Vancouver, BC",
                openingHours: "11AM to 12AM",
                rating: 4.3,
            },
        ],
    },
];

const userFriends = (friends = initialFriends, action) => {
    switch (action.type) {
        default:
            return friends;
    }
};

export default userFriends;
