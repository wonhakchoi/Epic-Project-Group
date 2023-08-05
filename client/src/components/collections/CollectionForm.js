import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    hideForm,
    setCollectionName,
    setCollectionImg
} from "../../redux/reducers/collectionsSlice";
import {Modal, TextField, Button, Box} from "@mui/material";
import {addNewCollectionAsync, getCollectionsAsync} from "../../redux/thunks/collectionsThunks";

// form for adding a new collection
export default function CollectionForm() {
    const isVisible = useSelector(state => state.collections.formVisible);
    const newCollectionName = useSelector(state => state.collections.newCollectionName);
    const newCollectionImg = useSelector(state => state.collections.newCollectionImg);
    const currUser = useSelector((state) => state.sauth.currUser);
    const dispatch = useDispatch();


    function closeForm() {
        dispatch(hideForm());
    }


    function handleSubmit(event) {
        event.preventDefault();
        // dispatch(addCollection());
        dispatch(addNewCollectionAsync({name: newCollectionName, img: newCollectionImg, userId: currUser}));
        dispatch(getCollectionsAsync(currUser));
        closeForm();
    }

    return (
        <Modal open={isVisible} onClose={closeForm}>
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
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Collection Name"
                        variant="outlined"
                        fullWidth
                        sx={{marginBottom: "16px"}}
                        onChange={(e) => dispatch(setCollectionName(e.target.value))}
                    />
                    <TextField
                        label="Collection Image"
                        variant="outlined"
                        fullWidth
                        sx={{marginBottom: "16px"}}
                        onChange={(e) => dispatch(setCollectionImg(e.target.value))}
                    />
                    <Box sx={{display: "flex", justifyContent: "flex-end"}}>
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            sx={{marginRight: "8px"}}
                        >
                            Submit
                        </Button>
                        <Button variant="contained" color="secondary" type="reset">
                            Clear
                        </Button>
                    </Box>
                </form>
            </Box>
        </Modal>
    );
}
