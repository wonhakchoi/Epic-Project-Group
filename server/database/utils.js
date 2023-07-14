const {User} = require("./models/userModel");
const {Restaurant} = require("./models/restaurantModel");
const {Cauliflower} = require("./models/cauliflowerModel");
const {sampleDBRestaurants} = require("../data/sampleRestaurants");
const {sampleCauliflowers} = require("../data/sampleCollections");

// clears all collections in the database
async function clearDatabase() {
    await User.deleteMany();
    await Restaurant.deleteMany();
    await Cauliflower.deleteMany();
}

// populates database with restaurant data
async function generateRestaurants() {

    for (let r of sampleDBRestaurants) {
        // console.log(r);
        const restaurant = new Restaurant(r);
        await restaurant.save();
    }

}

// populates database with collection data
async function generateCauliflowers() {
    for (let c of sampleCauliflowers) {
        const cauliflower = new Cauliflower(c);
        await cauliflower.save();
    }
}

module.exports = {clearDatabase, generateRestaurants, generateCauliflowers}