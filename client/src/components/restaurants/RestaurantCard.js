import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {deleteRestaurantCollectionAsync} from "../../redux/thunks/collectionsThunks";

// same as Restaurant.js but with remove button instead of add
// TODO: duplicate code
export default function RestaurantCard({restaurant}) {
    const collectionDetails = useSelector((state) => state.collections.currCollectionDetails);
    // const {_id, name, description, location, openingHours, rating} = restaurant;

    const {place_id, name, formatted_address, opening_hours, rating, user_ratings_total} = restaurant;
    let YesOrNo;
    let ratingWithColour;
    opening_hours["open_now"] ? YesOrNo = <span className="yesString">Yes</span> : YesOrNo =
        <span className="noString">No</span>
    rating < 2 ? ratingWithColour = <span className="noString">{rating}</span> : rating < 4 ? ratingWithColour =
        <span className="midString">{rating}</span> : ratingWithColour = <span className="yesString">{rating}</span>
    const dispatch = useDispatch();

    function handleRemove() {
        let cId = collectionDetails._id;
        dispatch(deleteRestaurantCollectionAsync({collectionId: cId, restaurantId: place_id}));
        window.location.reload();
    }

    return (
        <div className={'restaurant-card'}>
            <h3>{name}</h3>
            <p className="info">
                <span className="formatted_address">{formatted_address}</span>
            </p>
            <p className="info">
                <span className="opening-hours">Open Now? {YesOrNo}</span>
            </p>
            <p className="info">
                Rating: {ratingWithColour} by <span className="rating">{user_ratings_total}</span> users
            </p>
            <button className="add-to-collection-button" onClick={() => handleRemove()}>
                Remove to Collection
            </button>
        </div>
    )

    // <div className="restaurant-card">
    //     <h3>{name}</h3>
    //     <p className="description">{description}</p>
    //     <p className="info">
    //         <span className="location">{location}</span>
    //     </p>
    //     <p className="info">
    //         <span className="opening-hours">{openingHours}</span>
    //     </p>
    //     <p className="info">
    //         Rating: <span className="rating">{rating}</span>
    //     </p>
    //     <button className="add-to-collection-button" onClick={() => handleRemove()}>
    //         Remove from Collection
    //     </button>
    // </div>
}