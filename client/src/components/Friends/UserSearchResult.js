import React from "react";
import { useSelector } from "react-redux";
import "./UserSearchResult.css";

const UserSearchResult = ({ id, name, friends, pending }) => {
    const icons = useSelector((state) => state.iconLocations);

    return (
        <div className="search-result-container">
            <img className="user-search-icon" src={icons[id % icons.length]} alt={name} />
            <h3 className="user-search-name">{name}</h3>
            {friends ? (
                <div className="show-add-friends">
                    <img className="friends-icon" src="/images/web-icons/friend.png" alt="Friends!"></img>
                    <p className="add-friend-text">Friends</p>
                </div>
            ) : pending ? (
                <div className="show-add-friends">
                    <img className="friends-icon" src="/images/web-icons/pending.png" alt="Pending"></img>
                    <p className="add-friend-text">Pending</p>
                </div>
            ) : (
                <div className="show-add-friends">
                    <img
                        className="add-friend-icon"
                        src="/images/web-icons/addFriend.png"
                        alt="Add Friend"
                        onClick={(event) => console.log("Added Friend: " + name)}
                    ></img>
                    <p className="add-friend-text">Add Friend</p>
                </div>
            )}
        </div>
    );
};

export default UserSearchResult;
