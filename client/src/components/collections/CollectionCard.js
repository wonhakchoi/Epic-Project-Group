import "./Collection.css"
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
// import {clickCollection} from "../../redux/reducers/collectionsSlice";
// import {getCollectionDetails} from "../../redux/services/collectionsService";
import {getCollectionDetailsAsync, getRestaurantsAsync} from "../../redux/thunks/collectionsThunks";

// Component for each Collection Card
export default function CollectionCard({collectionId: collectionId, collection: collection}) {
    // const collectionDetails = useSelector(state => state.collections.currCollectionDetails);
    const dispatch = useDispatch();

    function handleCollectionClick() {
        // dispatch(clickCollection(collectionId))
        dispatch(getCollectionDetailsAsync(collectionId));
        dispatch(getRestaurantsAsync(collectionId));
    }

    return (
        <div className={"collection-card"}>
            <Link to={"/collections/" + collectionId} onClick={handleCollectionClick}>
                    <img alt={"cat"} src={collection.img}/>
                    <h2 className={"collection-title"}> {collection.name} </h2>
            </Link>
        </div>

    )
}