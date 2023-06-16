import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import UserSearchResult from "./UserSearchResult";
import useDebounce from "../hooks/useDebounce";
import "./FriendSearch.css";

const FriendSearch = () => {
    const users = useSelector((state) => state.allUsers);
    const friends = useSelector((state) => state.userFriends);
    const [name, setName] = useState("");
    const searchResults = useDebounce(name, 500);

    const filteredUsers = users.filter((user) => user.name.toLowerCase().includes(searchResults.toLowerCase()));

    const isFriend = (userId) => {
        return friends.some((friend) => friend.id === userId);
    };

    const resultsPerPage = 6;
    const [offset, setOffset] = useState(0);
    const incrementOffset = () => {
        if (offset + resultsPerPage >= filteredUsers.length) {
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
                        <UserSearchResult key={user.id} id={user.id} name={user.name} friends={isFriend(user.id)} />
                    ))}
                </div>
                <div className="user-search-results-navigation">
                    <button onClick={decrementOffset}>Previous</button>
                    <button onClick={incrementOffset}>Next</button>
                    <h5>
                        Page {offset / resultsPerPage + 1} out of{" "}
                        {Math.max(1, Math.ceil(filteredUsers.length / resultsPerPage))}
                    </h5>
                </div>
            </div>
        </div>
    );
};

export default FriendSearch;
