import React, { useState } from "react";
import { useSelector } from "react-redux";
import useDebounce from "../hooks/useDebounce";
import "./FriendSearch.css";

const FriendSearch = () => {
    const users = useSelector((state) => state.allUsers);
    const [name, setName] = useState("");
    const searchResults = useDebounce(name, 500);

    const filteredUsers = users.filter((user) => user.name.toLowerCase().includes(searchResults.toLowerCase()));

    const resultsPerPage = 5;
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

    return (
        <div>
            <h1>Search for Friends!</h1>
            <input
                name="name"
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Friend's Name"
            />
            <div>
                {filteredUsers.slice(offset, offset + resultsPerPage).map((user) => (
                    <h3 key={user.id}>
                        {user.id}. {user.name}
                    </h3>
                ))}
                <button onClick={incrementOffset}>Next</button>
                <button onClick={decrementOffset}>Previous</button>
            </div>
        </div>
    );
};

export default FriendSearch;
