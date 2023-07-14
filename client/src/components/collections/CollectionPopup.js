import {useDispatch, useSelector} from "react-redux";
import {hideAddToCollection} from "../../redux/reducers/collectionPopupSlice";
import {addRestaurantToCollection} from "../../redux/reducers/collectionsSlice";
import {Modal} from "@mui/material";

// pop up for displaying collections on the home page when adding restaurants
export default function CollectionPopup() {
    const userCollections = useSelector(state => state.collections.collections)
    const isVisible = useSelector(state => state.collectionPopup.addCollectionVisible)
    const currRestaurant = useSelector(state => state.collectionPopup.popupRestaurant)

    const dispatch = useDispatch();

    function addToCollection(collection) {
        dispatch(addRestaurantToCollection({collectionId: collection.id, restaurant: currRestaurant}));
        handleClose();
    }

    function handleClose() {
        dispatch(hideAddToCollection());
    }

    const collectionComponents = userCollections?.map(collection => (
        <button className={'collection-popup-button'} key={collection.id}
                onClick={() => addToCollection(collection)}> Add to {collection.name} </button>
    ))


    return <Modal open={isVisible} onClose={() => handleClose()}>
        <div className={'collection-popup'}>
            {collectionComponents}
        </div>
    </Modal>

}
