import "./ProfilePage.css";
import UserService from "../../redux/services/usersService";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ProfileFriend({ id }) {
    const icons = useSelector((state) => state.users.iconLocations);

    let [friend, setFriend] = useState({});
    useEffect(() => {
        const fetchFriendData = async () => {
            try {
                const friendData = await UserService.getUserByID(id);
                setFriend(friendData);
            } catch (error) {
                // Handle any errors that might occur during the promise resolution
                console.error("Error fetching friend data:", error);
            }
        };
        fetchFriendData();
    }, []);

    if (friend.data != undefined) {
        return (
            <div className="friend">
                <Link to={`/users/${id}`} style={{ textDecoration: "none", color: "inherit", cursor: "pointer" }}>
                    <img className="friend-image" src={icons[friend.data[0].icon]} alt="image not found" />
                </Link>
                <div className="user-descriptor">
                    <Link to={`/users/${id}`} style={{ textDecoration: "none", color: "inherit", cursor: "pointer" }}>
                        <label id="friend-name">{`${friend.data[0].firstName} ${friend.data[0].lastName}`}</label>{" "}
                    </Link>
                    <br />
                    <label id="friend-description">{friend.data[0].biography}</label>
                </div>
            </div>
        );
    } else {
        return <></>;
    }
}
