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


const allUsers = (users = initialUsers, action) => {
    switch (action.type) {
        default:
            return users;
    }
};

export default allUsers;
*/

import { createSlice } from "@reduxjs/toolkit";

let initialState = {};
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
    initialState[(i + 1).toString()] = {
        name: initialNames[i],
        biography: `${i % 2 === 0 ? "UBC" : "SFU"} student`,
        rated_restaurants: {},
    };
}

initialState["1"].rated_restaurants = {
    1: 3.5,
    4: 5.0,
};

initialState["3"].rated_restaurants = {
    4: 4.8,
};

initialState["4"].rated_restaurants = {
    1: 3.7,
    2: 2.9,
};

initialState["5"].rated_restaurants = {
    2: 4.2,
};

const allUsersSlice = createSlice({
    name: "allUsers",
    initialState,
    reducers: {},
});

export default allUsersSlice.reducer;
