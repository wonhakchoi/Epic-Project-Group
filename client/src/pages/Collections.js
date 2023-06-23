import {useState} from "react";
import "../components/collections/Collection.css"
import Collection from "../components/collections/Collection";

const {v4: uuid} = require('uuid');

// Some sample data, this will need to be stored in database later
const sampleCollections = [{name: "Collection 1"}, {name: "Collection 2"}, {name: "Collection 3"}]

// Page for displaying all the user made collections of restaurants
export default function Collections() {
    const [collections, setCollections] = useState(sampleCollections);

    function handleAddCollection() {
        setCollections([
            ...collections, {name: ("Collection")}
        ])
    }

    const displayCollections = collections.map(collection =>
        <Collection collectionDetails={collection} key={uuid()}/>)

    return (
        <div>
            {displayCollections}
            <button onClick={() => handleAddCollection()}>
                Create New Collection
            </button>
        </div>
    )

}