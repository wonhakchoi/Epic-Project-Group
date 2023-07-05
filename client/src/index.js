import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { enableMapSet } from "immer";
import collectionsReducer from "./redux/reducers/collectionsSlice";
import homeReducer from "./redux/reducers/homeSlice";
import usersReducer from "./redux/reducers/userReducer";
import restaurantsReducer from "./redux/reducers/restaurantReducer";
import authenticationReducer from "./redux/reducers/authenticationReducer";

enableMapSet();

const store = configureStore({
    reducer: {
        users: usersReducer,
        restaurants: restaurantsReducer,
        authentication: authenticationReducer,
        collections: collectionsReducer,
        home: homeReducer,
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
