import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { enableMapSet } from "immer";
import collectionsReducer from "./redux/reducers/collectionsSlice";
import collectionsPopupReducer from "./redux/reducers/collectionPopupSlice";
import usersReducer from "./redux/reducers/userReducer";
import ratingsReducer from "./redux/reducers/allRatingsSlice";
import restaurantsReducer from "./redux/reducers/restaurantReducer";
import authenticationReducer from "./redux/reducers/authenticationReducer";

enableMapSet();

const store = configureStore({
    reducer: {
        users: usersReducer,
        restaurants: restaurantsReducer,
        ratings: ratingsReducer,
        authentication: authenticationReducer,
        collections: collectionsReducer,
        collectionPopup: collectionsPopupReducer,
    },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>
);
