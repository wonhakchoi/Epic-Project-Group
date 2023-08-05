import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { acceptIncomingAsync, rejectIncomingAsync } from "../../redux/thunks/usersThunks";
import "./Requests.css";
import "./Buttons.css";

const IncomingRequest = ({ id, icon, name, biography }) => {
    const icons = useSelector((state) => state.users.iconLocations);
    let currUser = useSelector((state) => state.sauth.currUser);
    const dispatch = useDispatch();

    return (
        <div className="request-container">
            <section className="incoming-request-header">
                <img className="user-icon" src={icons[icon]} alt={name} />
                <h3>{name}</h3>
                <p className="biography">{biography}</p>
            </section>
            <section className="incoming-request-buttons">
                <button
                    className="accept-button friend-request-button"
                    onClick={() => dispatch(acceptIncomingAsync({ userID: currUser, otherID: id }))}
                >
                    Accept
                </button>
                <button
                    className="reject-button friend-request-button"
                    onClick={() => dispatch(rejectIncomingAsync({ userID: currUser, otherID: id }))}
                >
                    Reject
                </button>
            </section>
        </div>
    );
};

export default IncomingRequest;
