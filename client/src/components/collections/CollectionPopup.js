import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {hideAddToCollection} from "../../redux/reducers/collectionPopupSlice";
import {Modal, Button, Box} from "@mui/material";
import {addRestaurantCollectionAsync} from "../../redux/thunks/collectionsThunks";

// pop up for displaying collections on the home page when adding restaurants
export default function CollectionPopup() {
    const userCollections = useSelector((state) => state.collections.collections);
    const isVisible = useSelector((state) => state.collectionPopup.addCollectionVisible);
    const currRestaurant = useSelector((state) => state.collectionPopup.popupRestaurant);
    const dispatch = useDispatch();

    function addToCollection(collection) {
        dispatch(addRestaurantCollectionAsync({collectionId: collection._id, restaurantId: currRestaurant.place_id}))
        handleClose();
    }

    function handleClose() {
        dispatch(hideAddToCollection());
    }

    const collectionComponents = userCollections?.map((collection) => (
        <div key={collection._id} style={{marginBottom: "10px"}}>
            <Button
                variant="contained"
                onClick={() => addToCollection(collection)}
                fullWidth
            >
                Add to {collection.name}
            </Button>
        </div>
    ));


    return (
        <Modal open={isVisible} onClose={handleClose}>
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    backgroundColor: "white",
                    padding: "20px",
                    borderRadius: "8px",
                    boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.16)",
                }}
            >
                <h3>Select a Collection:</h3>
                <div className="collection-popup-buttons">{collectionComponents}</div>
            </Box>
        </Modal>
    );
}

