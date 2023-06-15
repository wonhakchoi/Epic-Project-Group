import React, { useState } from "react";
import { useSelector } from "react-redux";
import useDebounce from "../hooks/useDebounce";

const FriendSearch = () => {
    const friends = useSelector((state) => state.userFriends);
    const users = useSelector((state) => state.allUsers);
    const [name, setName] = useState("");
    const searchResults = useDebounce(name, 500);

    const filteredUsers = users.filter((user) => user.name.toLowerCase().includes(searchResults.toLowerCase()));

    // Let search results load automatically after a time interval where name does not change
    // Implement pagination
    return (
        <div>
            <h1>Search for Friends!</h1>
            <input
                name="name"
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Friend's Name"
                required
            />
            <ul>
                {filteredUsers.map((user) => (
                    <li key={user.id}>{user.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default FriendSearch;
