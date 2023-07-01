import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { outgoingToStranger } from "../../redux/actions/userActions";
import "./Requests.css";

const OutgoingRequest = ({ id, name, biography }) => {
    const icons = useSelector((state) => state.users.iconLocations);
    const dispatch = useDispatch();

    return (
        <div className="request-container">
            <section className="outgoing-request-header">
                <img className="user-icon" src={icons[id % icons.length]} alt={name} />
                <h3>{name}</h3>
                <p className="biography">{biography}</p>
            </section>
            <section className="outgoing-request-buttons">
                <button
                    className="reject-button friend-request-button"
                    onClick={() => outgoingToStranger(dispatch, id)}
                >
                    Cancel
                </button>
            </section>
        </div>
    );
};

export default OutgoingRequest;
