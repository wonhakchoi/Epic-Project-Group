import React from "react";
import "./Restaurant.css";
import {useDispatch} from "react-redux";
import {displayAddToCollection} from "../redux/reducers/homeSlice";
import CollectionPopup from "./CollectionPopup";

const Restaurant = ({restaurant}) => {
    const {name, description, location, openingHours, rating} = restaurant;
    const dispatch = useDispatch();


    const handleAddToCollection = () => {
        // console.log("Add to My List clicked!", name);
        dispatch(displayAddToCollection())
    }

    return (
        <div className="restaurant-card">
            <h3>{name}</h3>
            <p className="description">{description}</p>
            <p className="info">
                <span className="location">{location}</span>
            </p>
            <p className="info">
                <span className="opening-hours">{openingHours}</span>
            </p>
            <p className="info">
                Rating: <span className="rating">{rating}</span>
            </p>
            <button className="add-to-collection-button" onClick={handleAddToCollection}>
                Add to My List
            </button>
            {/*<CollectionPopup restaurant={restaurant}></CollectionPopup>*/}

        </div>
    );
};

export default Restaurant;
