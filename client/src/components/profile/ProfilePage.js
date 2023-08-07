import React from "react";
import "./ProfilePage.css";
import ProfileFriend from "./ProfileFriend";
import User from "./User"
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux"
  
export default function ProfilePage() {  
    let navigate = useNavigate();

    const routeChange = () => { 
        let path = '../friends'; 
        navigate(path);
    } 

    const auth = useSelector(state => state.authentication.authentication)
    const user = auth.user;
    if (user !== null) {
        return (
            <div>
                <User name={user.firstName + user.lastName} biography={user.biography}/>
                <div className="friends-header">
                    <label id="friend-title">Friends</label>
                    <button id="navigate-button" onClick={routeChange}>To Friends Page</button>
                </div>

                <div className="friends">
                    {user.friends.map((friend) => {
                        return (
                            <ProfileFriend id={friend}/>
                        )
                    })}
                </div>
                
                <div className="restaurants-header">
                    <label id="restaurant-title">Your Restaurants</label>
                </div>
                <ul className="restaurants">
                    <div><li className="item">
                        <label className="restaurant-name">Rain or Shine</label><br /> 
                        <label className="restaurant-description">Address: 6001 University Blvd</label> <br /> 
                        <label className="restaurant-rating">Rating: 4.2⭐</label> <br />
                        {/* <img src="https://scontent.fyvr3-1.fna.fbcdn.net/v/t39.30808-6/298627466_604286454418119_5290469191731890042_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=69VQBw_8KLgAX8DFgi3&_nc_ht=scontent.fyvr3-1.fna&oh=00_AfBOJA59zcjiX6wo-5c9-8h73KODnO1UKlhz-yxhFvRgjg&oe=649B6106" alt="URL not found" width="450" height="400" /> */}
                        </li>
                    </div>
                    <div><li className="item">
                        <label className="restaurant-name">McDonald's</label> <br /> 
                        <label className="restaurant-description">Address: 5728 University Blvd</label> <br /> 
                        <label className="restaurant-rating">Rating: 3.9⭐</label> <br />
                        <img src="https://downloadr2.apkmirror.com/wp-content/uploads/2023/06/86/6486df66614d9_com.mcdonalds.app.uk.png" alt="URL not found" width="450" height="400" />
                        </li>
                    </div>
                    
                </ul>
            </div>
        );
    }
};