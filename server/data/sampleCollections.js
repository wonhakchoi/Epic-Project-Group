// temporary sample data for collections

const COLLECTION_IMG1 =
  "https://pbs.twimg.com/profile_images/1174018931532550144/jRmFjhVX_400x400.png";
const COLLECTION_IMG2 =
  "https://img.freepik.com/free-vector/beer-mug-pretzel-signboard-neon-sign_1262-20705.jpg?w=360";

const sampleCauliflowers = [
  {
    name: "UBC Food Places",
    img: COLLECTION_IMG1,
    pinned: false,
    restaurants: ["ChIJw-s4pFdxhlQRh2jK22eXlnU"],
    userId: "64c0c02049527aa580a7d002"
  },
  {
    name: "Dinner",
    img: COLLECTION_IMG2,
    pinned: false,
    restaurants: [],
    userId: "64c0c02049527aa580a7d002"
  },
];

// https://stackoverflow.com/questions/8595509/how-do-you-share-constants-in-nodejs-modules

module.exports = Object.freeze({
  sampleCauliflowers: sampleCauliflowers
});
