import React, { useState } from "react";
import "./Restaurant.css";
import {useDispatch} from "react-redux";
import {displayAddToCollection, setRestaurant} from "../../redux/reducers/collectionPopupSlice";
import { getMapPhoto } from "../../redux/services/mapService"

const Restaurant = ({restaurant}) => {
    const dispatch = useDispatch();

    const handleAddToCollection = () => {
        dispatch(displayAddToCollection())
        dispatch(setRestaurant(restaurant))
    }

    let [imgsrc, setImgsrc] = useState("")

    const {name, formatted_address, opening_hours, rating, user_ratings_total, picture_icon, types} = restaurant;
    if (name && formatted_address && opening_hours && rating && user_ratings_total && picture_icon) {
        if (!types.includes("food") && !types.includes("restaurant")) {
            return <></>
        }
        let YesOrNo = <span className="midString">Undisclosed</span>;
        let ratingWithColour;
        if ("open_now" in opening_hours) {
            opening_hours["open_now"] ? YesOrNo = <span className="yesString">Yes</span> : YesOrNo = <span className="noString">No</span>
        } else {
            console.log(opening_hours)
        }
        rating < 2 ? ratingWithColour = <span className="noString">{rating}</span> : rating < 4 ? ratingWithColour = <span className="midString">{rating}</span> : ratingWithColour = <span className="yesString">{rating}</span>
        return (
            <div className={'restaurant-card'}>
                <img className="restaurant-img"src={picture_icon} alt="URL not found"></img>
                <div className="descriptor">
                    <h3>{name}</h3>
                    <p className="info"><span className="formatted_address">{formatted_address}</span></p>
                    <p className="info"><span className="opening-hours">Open Now? {YesOrNo}</span></p>
                    <p className="info">Rating: {ratingWithColour} by <span className="rating">{user_ratings_total}</span> users</p>
                    <button className="add-to-collection-button" onClick={handleAddToCollection}>Add to Collection</button>
                </div>
            </div>
        );
    } else {
        return <></>
    }
};

export default Restaurant;
