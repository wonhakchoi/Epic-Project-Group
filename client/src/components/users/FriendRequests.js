import React from "react";
import { useSelector } from "react-redux";
import OutgoingRequest from "./OutgoingRequest";
import IncomingRequest from "./IncomingRequest";
import "./FriendRequests.css";

const FriendRequests = () => {
    const outRequests = useSelector((state) => state.users.outgoingRequests);
    const inRequests = useSelector((state) => state.users.incomingRequests);
    const allUsers = useSelector((state) => state.users.allUsers);

    return (
        <div className="friend-requests-container">
            <section>
                <h1>Pending Requests</h1>
                <div className="requests">
                    {[...outRequests].map((key) => {
                        const user = allUsers[key];
                        return <OutgoingRequest key={key} id={key} name={user.name} biography={user.biography} />;
                    })}
                </div>
            </section>
            <section>
                <h1>Incoming Requests</h1>
                <div className="requests">
                    {[...inRequests].map((key) => {
                        const user = allUsers[key];
                        return <IncomingRequest key={key} id={key} name={user.name} biography={user.biography} />;
                    })}
                </div>
            </section>
        </div>
    );
};

export default FriendRequests;
