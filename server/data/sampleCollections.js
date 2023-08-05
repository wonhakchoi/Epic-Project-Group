// temporary sample data for collections

// const COLLECTION_IMG = "https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=580&q=80"

const COLLECTION_IMG1 =
  "https://pbs.twimg.com/profile_images/1174018931532550144/jRmFjhVX_400x400.png";
const COLLECTION_IMG2 =
  "https://img.freepik.com/free-vector/beer-mug-pretzel-signboard-neon-sign_1262-20705.jpg?w=360";

const sampleUserCollections = [
  {
    id: "ca",
    name: "UBC Food Places",
    img: COLLECTION_IMG1,
    pineed: false,
    restaurants: [
      {
        id: "rainorshine",
        name: "Rain or Shine Ice Cream",
        description: "Ice Cream",
        location: "6001 University Blvd, Vancouver, BC",
        openingHours: "12:00 PM to 10:00 PM",
        rating: 4.6,
      },
      {
        id: "mcdonalds",
        name: "McDonald's",
        description: "Fast food restaurant",
        location: "5728 University Blvd, Vancouver, BC",
        openingHours: "Open 24 hours",
        rating: 3.4,
      },
    ],
  },
  {
    id: "cb",
    name: "Dinner",
    img: COLLECTION_IMG2,
    pineed: false,
    restaurants: [
      {
        id: "browns",
        name: "Browns Crafthouse UBC",
        description: "Pub",
        location: "6111 University Blvd, Vancouver, BC",
        openingHours: "11AM to 12AM",
        rating: 4.3,
      },
    ],
  },
];

// const sampleCauliflowers =
//     [
//         {
//             name: "UBC Food Places", img: COLLECTION_IMG1, restaurants: ['64b1a56b637046211569d760', '64b1a56b637046211569d762']
//         },
//         {
//             name: "Dinner", img: COLLECTION_IMG2, restaurants: ['64b1a56b637046211569d764']
//         }
//     ]

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
  sampleUserCollections: sampleUserCollections,
  sampleCauliflowers: sampleCauliflowers,
});
