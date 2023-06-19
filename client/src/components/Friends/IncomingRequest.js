import React from "react";
import { useSelector } from "react-redux";

const IncomingRequest = ({ id, name, biography }) => {
    const icons = useSelector((state) => state.iconLocations);

    return (
        <div>
            <section className="incoming-request-header">
                <img className="user-icon" src={icons[id % icons.length]} alt={name} />
                <h3>{name}</h3>
                <p className="biography">{biography}</p>
            </section>
            <section className="incoming-request-buttons">
                <button>Accept</button>
                <button>Reject</button>
            </section>
        </div>
    );
};

export default IncomingRequest;
