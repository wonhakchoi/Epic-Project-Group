import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { cancelOutgoingAsync } from "../../redux/thunks/usersThunks";
import "./Requests.css";
import "./Buttons.css";

const OutgoingRequest = ({ id, icon, name, biography }) => {
    const icons = useSelector((state) => state.users.iconLocations);
    let currUser = useSelector((state) => state.sauth.currUser);
    const dispatch = useDispatch();

    return (
        <div className="request-container">
            <section className="outgoing-request-header">
                <img className="user-icon" src={icons[icon]} alt={name} />
                <h3>{name}</h3>
                <p className="biography">{biography}</p>
            </section>
            <section className="outgoing-request-buttons">
                <button
                    className="reject-button friend-request-button"
                    onClick={() => dispatch(cancelOutgoingAsync({ userID: currUser, otherID: id }))}
                >
                    Cancel
                </button>
            </section>
        </div>
    );
};

export default OutgoingRequest;
