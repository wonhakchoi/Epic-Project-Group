import React from "react";
import { useSelector } from "react-redux";
import "./Requests.css";

const IncomingRequest = ({ id, name, biography }) => {
    const icons = useSelector((state) => state.iconLocations);

    return (
        <div className="request-container">
            <section className="incoming-request-header">
                <img className="user-icon" src={icons[id % icons.length]} alt={name} />
                <h3>{name}</h3>
                <p className="biography">{biography}</p>
            </section>
            <section className="incoming-request-buttons">
                <button className="accept-button friend-request-button">Accept</button>
                <button className="reject-button friend-request-button">Reject</button>
            </section>
        </div>
    );
};

export default IncomingRequest;
