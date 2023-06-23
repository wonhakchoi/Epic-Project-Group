import "./Collection.css"
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import {clickCollection} from "../../redux/reducers/collectionsSlice";

// Component for each Collection Card
export default function CollectionCard({collectionDetails: collectionDetails}) {
    const dispatch = useDispatch();

    function handleCollectionClick() {
        dispatch(clickCollection(collectionDetails))
    }

    return (
        <div className={"collection-card"}>
            <Link to={"/collections/" + collectionDetails.id} onClick={handleCollectionClick}>
                    <img alt={"cat"} src={collectionDetails.img}/>
                    <h2 className={"collection-title"}> {collectionDetails.name} </h2>
            </Link>
        </div>

    )
}