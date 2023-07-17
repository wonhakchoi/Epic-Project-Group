import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { cancelOutgoingAsync } from "../../redux/thunks/usersThunks";
import "./Requests.css";
import "./Buttons.css";

const OutgoingRequest = ({ id, name, biography }) => {
    const icons = useSelector((state) => state.users.iconLocations);
    const authenticationSlice = useSelector((state) => state.authentication.authentication);
    const dispatch = useDispatch();

    return (
        <div className="request-container">
            <section className="outgoing-request-header">
                <img className="user-icon" src={icons[Math.floor(Math.random() * icons.length)]} alt={name} />
                <h3>{name}</h3>
                <p className="biography">{biography}</p>
            </section>
            <section className="outgoing-request-buttons">
                <button
                    className="reject-button friend-request-button"
                    onClick={() => dispatch(cancelOutgoingAsync({ userID: authenticationSlice.user, otherID: id }))}
                >
                    Cancel
                </button>
            </section>
        </div>
    );
};

export default OutgoingRequest;
