import React from "react";
import { useSelector } from "react-redux";
import OutgoingRequest from "./OutgoingRequest";
import IncomingRequest from "./IncomingRequest";
import "./FriendRequests.css";

const FriendRequests = () => {
    const outRequestsSlice = useSelector((state) => state.users.outgoingRequests);
    const inRequestsSlice = useSelector((state) => state.users.incomingRequests);
    const usersSlice = useSelector((state) => state.users.allUsers);

    return (
        <div className="friend-requests-container">
            <section>
                <h2>Pending Requests</h2>
                <div className="requests">
                    {outRequestsSlice.outgoingRequests.map((id) => {
                        const user = usersSlice.users.filter((user) => user._id === id)[0];
                        return <OutgoingRequest key={id} id={id} name={user.firstName} biography={user.biography} />;
                    })}
                </div>
            </section>
            <section>
                <h2>Incoming Requests</h2>
                <div className="requests">
                    {inRequestsSlice.incomingRequests.map((id) => {
                        const user = usersSlice.users.filter((user) => user._id === id)[0];
                        return <IncomingRequest key={id} id={id} name={user.firstName} biography={user.biography} />;
                    })}
                </div>
            </section>
        </div>
    );
};

export default FriendRequests;
