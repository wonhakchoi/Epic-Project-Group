import "../components/collections/Collection.css"
import CollectionCard from "../components/collections/CollectionCard";
import {useDispatch, useSelector} from "react-redux";
import {showForm} from "../redux/reducers/collectionsSlice";
import CollectionForm from "../components/collections/CollectionForm";

// Page for displaying all the user made collections of restaurants
export default function Collections() {
    // const [collections, setCollections] = useState(sampleCollections);
    const collections = useSelector((state) => state.collections.collections)
    const dispatch = useDispatch();


    function handleAddCollection() {
        // dispatch(addCollection({id: uuid(), name: "New Collection", img: COLLECTION_IMG}));
        dispatch(showForm());
    }

    const displayCollections = collections.map(collection =>
        <CollectionCard collectionId={collection._id} collection={collection} key={collection._id}/>)

    return (
        <div>
            {displayCollections}
            <button onClick={() => handleAddCollection()}>
                Create New Collection
            </button>
            <CollectionForm> </CollectionForm>
        </div>
    )

}