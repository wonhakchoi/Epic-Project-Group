import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {deleteRestaurantCollectionAsync} from "../../redux/thunks/collectionsThunks";

// same as Restaurant.js but with remove button instead of add
// TODO: duplicate code
export default function RestaurantCard({restaurant}) {
    const collectionDetails = useSelector((state) => state.collections.currCollectionDetails);
    const {_id, name, description, location, openingHours, rating} = restaurant;
    const dispatch = useDispatch();

    function handleRemove() {
        let cId = collectionDetails._id;
        dispatch(deleteRestaurantCollectionAsync({collectionId: cId, restaurantId: _id}));
        window.location.reload();
    }

    return <div className="restaurant-card">
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
        <button className="add-to-collection-button" onClick={() => handleRemove()}>
            Remove from Collection
        </button>
    </div>
}