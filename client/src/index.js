import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import rootReducer from "./redux/reducers";
import {Provider} from "react-redux";
import {configureStore} from "@reduxjs/toolkit";
import collectionsReducer from './redux/reducers/collectionsSlice'
import homeReducer from './redux/reducers/homeSlice'


const store = configureStore({reducer: {rootReducer, collections: collectionsReducer, home: homeReducer}});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <App/>
        </Provider>
    </React.StrictMode>
);
