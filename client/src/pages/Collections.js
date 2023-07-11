import "../components/collections/Collection.css"
import CollectionCard from "../components/collections/CollectionCard";
import {useDispatch, useSelector} from "react-redux";
import {addCollection} from "../redux/reducers/collectionsSlice";
import {COLLECTION_IMG} from "../redux/data/sampleCollections";
import {useEffect} from "react";
import {getCollectionsAsync} from "../redux/thunks/collectionsThunks";

const {v4: uuid} = require('uuid');

// Page for displaying all the user made collections of restaurants

// TODO: form for adding new collections
// TODO: delete collections
// TODO: be able to modify existing collections

export default function Collections() {
    // const [collections, setCollections] = useState(sampleCollections);
    const collections = useSelector((state) => state.collections.collections)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCollectionsAsync());
    }, []);


    function handleAddCollection() {
        dispatch(addCollection({id: uuid(), name: "New Collection", img: COLLECTION_IMG}));
    }

    const displayCollections = collections.map(collection =>
        <CollectionCard collectionDetails={collection} key={collection.id}/>)

    return (
        <div>
            {displayCollections}
            <button onClick={() => handleAddCollection()}>
                Create New Collection
            </button>
        </div>
    )

}