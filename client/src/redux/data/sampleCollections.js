import {v4 as uuid} from "uuid";

// temporary sample data for collections

export const COLLECTION_IMG = "https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=580&q=80"
export const sampleUserCollections = [
    {
        id: uuid(), name: "Collection A", img: COLLECTION_IMG, restaurants: [
            {
                id: uuid(),
                name: "Rain or Shine Ice Cream",
                description: "Ice Cream",
                location: "6001 University Blvd, Vancouver, BC",
                openingHours: "12:00 PM to 10:00 PM",
                rating: 4.6,
            },
            {
                id: uuid,
                name: "McDonald's",
                description: "Fast food restaurant",
                location: "5728 University Blvd, Vancouver, BC",
                openingHours: "Open 24 hours",
                rating: 3.4,
            }
        ]
    },
    {
        id: uuid(), name: "Collection B", img: COLLECTION_IMG, restaurants: [
            {
                id: 3,
                name: "Browns Crafthouse UBC",
                description: "Pub",
                location: "6111 University Blvd, Vancouver, BC",
                openingHours: "11AM to 12AM",
                rating: 4.3,
            }
        ]
    },
]
