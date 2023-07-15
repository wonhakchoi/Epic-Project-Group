import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { unfriendAsync } from "../../redux/thunks/usersThunks";
import "./Friend.css";
import "./Buttons.css";

const Friend = ({ id, name, biography, ratedRestaurants }) => {
    const icons = useSelector((state) => state.users.iconLocations);
    const restaurantsSlice = useSelector((state) => state.restaurants.allRestaurants);
    const authenticationSlice = useSelector((state) => state.authentication.authentication);
    const dispatch = useDispatch();

    return (
        <div className="friend-container">
            <section className="friend-header">
                <img className="user-icon" src={icons[Math.floor(Math.random() * icons.length)]} alt={name} />
                <h3>{name}</h3>
                <p className="biography">{biography}</p>
            </section>
            <section className="rated-restaurants">
                <b>Rated Restaurants</b>
                {Object.entries(ratedRestaurants).map(([id, rating]) => {
                    const restaurant = restaurantsSlice.restaurants.filter((restaurant) => restaurant._id === id)[0];
                    return (
                        <div key={id}>
                            <p className="restaurant-info">
                                {restaurant.name} ~ {rating}⭐
                            </p>
                        </div>
                    );
                })}
            </section>
            <section className="friend-buttons">
                <button
                    className="accept-button friend-request-button"
                    onClick={() => console.log(`View Profile ID ${id}`)}
                >
                    View
                </button>
                <button
                    className="reject-button friend-request-button"
                    onClick={() => dispatch(unfriendAsync({ userID: authenticationSlice.user, otherID: id }))}
                >
                    Unfriend
                </button>
            </section>
        </div>
    );
};

export default Friend;
