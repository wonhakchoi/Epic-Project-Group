import React from "react";
import { useSelector } from "react-redux";
import "./Requests.css";

const OutgoingRequest = ({ id, name, biography }) => {
    const icons = useSelector((state) => state.iconLocations);

    return (
        <div>
            <section className="outgoing-request-header">
                <img className="user-icon" src={icons[id % icons.length]} alt={name} />
                <h3>{name}</h3>
                <p className="biography">{biography}</p>
            </section>
            <section className="outgoing-request-buttons">
                <button className="reject-button friend-request-button">Cancel</button>
            </section>
        </div>
    );
};

export default OutgoingRequest;
