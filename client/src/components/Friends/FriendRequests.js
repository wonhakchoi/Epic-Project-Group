import React from "react";
import { useSelector } from "react-redux";
import OutgoingRequest from "./OutgoingRequest";
import IncomingRequest from "./IncomingRequest";

const FriendRequests = () => {
    const outRequests = useSelector((state) => state.outgoingRequests);
    const inRequests = useSelector((state) => state.incomingRequests);
    const allUsers = useSelector((state) => state.allUsers);

    return (
        <div>
            <section>
                <h1>Pending Requests</h1>
                <div className="out-requests">
                    {outRequests.map((key) => {
                        const user = allUsers[key];
                        return <OutgoingRequest key={key} user={user} />;
                    })}
                </div>
            </section>
            <section>
                <h1>Incoming Requests</h1>
                <div className="in-requests">
                    {inRequests.map((key) => {
                        const user = allUsers[key];
                        return <IncomingRequest key={key} user={user} />;
                    })}
                </div>
            </section>
        </div>
    );
};

export default FriendRequests;
