import "./ProfilePage.css";
import UserService from "../../redux/services/usersService"
import { useState, useEffect } from 'react';

export default function ProfileFriend({id}) {  
    let [friend, setFriend] = useState({})
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
    }, []) 


    if (friend.data != undefined) {
        console.log(friend)
        return (
            <div className="friend">
                <img className="friend-image" src={"/images/user-icons/giraffe.png"} alt="image not found" />
                <div className="user-descriptor">
                    <label id="friend-name">{`${friend.data[0].firstName} ${friend.data[0].lastName}`}</label> <br />
                    <label id="friend-description">{friend.data[0].biography}</label>
                </div>
            </div>
        );
    } else {
        return <></>
    }
    
}