import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import UserSearchResult from "./UserSearchResult";
import useDebounce from "../../hooks/useDebounce";
import { determineStatus } from "../../utils/userUtils";
import "./FriendSearch.css";

const FriendSearch = () => {
    const usersSlice = useSelector((state) => state.users.allUsers);
    const friendsSlice = useSelector((state) => state.users.userFriends);
    const outRequestsSlice = useSelector((state) => state.users.outgoingRequests);
    const inRequestsSlice = useSelector((state) => state.users.incomingRequests);
    const authenticationSlice = useSelector((state) => state.authentication.authentication);

    // returns users whose name includes the given string
    const [name, setName] = useState("");
    const searchResults = useDebounce(name, 500);
    const filteredUsers = usersSlice.users.filter(
        (user) =>
            user.firstName.toLowerCase().includes(searchResults.toLowerCase()) && user._id !== authenticationSlice.user
    );

    // logic for the pagination
    const [offset, setOffset] = useState(0);
    const resultsPerPage = 6;
    const incrementOffset = () => {
        if (offset + resultsPerPage >= Object.keys(filteredUsers).length) {
            return;
        }
        setOffset(offset + resultsPerPage);
    };
    const decrementOffset = () => {
        setOffset(Math.max(0, offset - resultsPerPage));
    };
    useEffect(() => {
        setOffset(0);
    }, [searchResults]);

    return (
        <div className="user-search-container">
            <div className="user-search-input">
                <h1>Search for Friends!</h1>
                <input
                    name="name"
                    type="text"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    placeholder="Friend's Name"
                />
            </div>
            <div className="user-search-results">
                <div className="user-search-users">
                    {filteredUsers.slice(offset, offset + resultsPerPage).map((user) => (
                        <UserSearchResult
                            key={user._id}
                            id={user._id}
                            icon={user.icon}
                            name={user.firstName}
                            status={determineStatus(
                                user._id,
                                friendsSlice.friends,
                                outRequestsSlice.outgoingRequests,
                                inRequestsSlice.incomingRequests
                            )}
                        />
                    ))}
                </div>
                <div className="user-search-results-navigation">
                    <img
                        className="arrow reverse"
                        src="/images/web-icons/next.png"
                        alt="Previous"
                        onClick={decrementOffset}
                    ></img>
                    <img className="arrow" src="/images/web-icons/next.png" alt="Next" onClick={incrementOffset}></img>
                    <h5>
                        Page {offset / resultsPerPage + 1} out of{" "}
                        {Math.max(1, Math.ceil(Object.keys(filteredUsers).length / resultsPerPage))}
                    </h5>
                </div>
            </div>
        </div>
    );
};

export default FriendSearch;
