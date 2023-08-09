import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    hideForm,
    setCollectionName,
    setCollectionImg,
    setLoaded
} from "../../redux/reducers/collectionsSlice";
import { Modal, TextField, Button, Box, IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";
import {
  addNewCollectionAsync,
  getCollectionsAsync,
} from "../../redux/thunks/collectionsThunks";

// form for adding a new collection
export default function CollectionForm() {
  const isVisible = useSelector((state) => state.collections.formVisible);
  const newCollectionName = useSelector(
    (state) => state.collections.newCollectionName
  );
  const newCollectionImg = useSelector(
    (state) => state.collections.newCollectionImg
  );
  const currUser = useSelector((state) => state.sauth.currUser);
  const dispatch = useDispatch();

  function closeForm() {
    dispatch(hideForm());
  }

  function handleSubmit(event) {
    event.preventDefault();
    dispatch(setLoaded(false));
    dispatch(
      addNewCollectionAsync({
        name: newCollectionName,
        img: newCollectionImg,
        userId: currUser,
      })
    )
      .then(() => {
        dispatch(getCollectionsAsync(currUser));
      })
      .then(() => {
        closeForm();
        dispatch(setLoaded(true));
      });
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
          padding: "5vh",
          borderRadius: "2vh",
          boxShadow: "0px 3vh 6vh rgba(0, 0, 0, 0.16)",
        }}
      >
        {/* Close button */}
        <IconButton
          onClick={closeForm}
          sx={{
            position: "absolute",
            top: "1vh",
            right: "1vh",
          }}
        >
          <Close sx={{ color: "#948B9A", height: "2.5vh", width: "2.5vh" }} />
        </IconButton>

        <form onSubmit={handleSubmit}>
          <TextField
            label="Collection Name"
            variant="outlined"
            fullWidth
            sx={{
              marginBottom: "4vh",
              "& input": {
                fontSize: "2vh",
              },
              "& label": {
                fontSize: "2vh",
              },
            }}
            onChange={(e) => dispatch(setCollectionName(e.target.value))}
          />
          <TextField
            label="Collection Image"
            variant="outlined"
            fullWidth
            sx={{
              marginBottom: "2vh",
              "& input": {
                fontSize: "2vh",
              },
              "& label": {
                fontSize: "2vh",
              },
            }}
            onChange={(e) => dispatch(setCollectionImg(e.target.value))}
          />
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              sx={{
                fontSize: "2vh",
                padding: "1vh 1.6vh",
                marginRight: "2vh",
                backgroundColor: "#5D44CA",
                color: "#FFFFFF",
                "&:hover": {
                  backgroundColor: "#432C8F",
                },
              }}
            >
              Submit
            </Button>
            <Button
              variant="contained"
              color="secondary"
              type="reset"
              sx={{
                fontSize: "2vh",
                padding: "1vh 1.6vh",
                backgroundColor: "#5D44CA",
                color: "#FFFFFF",
                "&:hover": {
                  backgroundColor: "#432C8F",
                },
              }}
            >
              Clear
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
}
