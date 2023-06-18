/**
 * Represents all users on the site
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
    };
}

const allUsers = (users = initialUsers, action) => {
    switch (action.type) {
        default:
            return users;
    }
};

export default allUsers;
