/**
 * Represents all users on the site
 *
 * id: {
 *      name: "Michael Myers",
 *      biography: "UBC Student",
 *      rated_restaurants: {
 *          1: 4.5,
 *          3: 2.9
 *      }
 * }
 */

let initialUsers = {};
let initialNames = [
    "Cedric Pulmano",
    "Malcolm Zhao",
    "Tammy Kim",
    "Wendy Shen",
    "Wonhak Choi",
    "Johnny Test",
    "Bruce Wayne",
    "Conner Connerson",
    "Jesus Christ",
    "Jimi Hendrix",
    "Quentin Tarantino",
    "Taz Mania",
    "Tally Hall",
    "Sally Hall",
    "Kurt Cobain",
    "Molly Mollerson",
    "Daffy Duck",
    "Liam Pulmano",
    "Jonathan Hermon",
    "Sean Noh",
    "Jerry Springer",
];

for (let i = 0; i < initialNames.length; i++) {
    initialUsers[(i + 1).toString()] = {
        name: initialNames[i],
        biography: `${i % 2 === 0 ? "UBC" : "SFU"} student`,
        rated_restaurants: {},
    };
}

initialUsers["1"].rated_restaurants = {
    1: 3.5,
    4: 5.0,
};

initialUsers["3"].rated_restaurants = {
    4: 4.8,
};

initialUsers["4"].rated_restaurants = {
    1: 3.7,
    2: 2.9,
};

initialUsers["5"].rated_restaurants = {
    2: 4.2,
};

const allUsers = (users = initialUsers, action) => {
    switch (action.type) {
        default:
            return users;
    }
};

export default allUsers;
