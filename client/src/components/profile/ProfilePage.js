import React from "react";
import "./ProfilePage.css";
import User from "./User"
import { useNavigate } from "react-router-dom";
  
export default function ProfilePage() {   
    let navigate = useNavigate();

    const routeChange = () =>{ 
        let path = '../friends'; 
        navigate(path);
    } 

    return (
        <div>
            <User />
            <div className="friends-header">
                <label id="friend-title">Friends</label>
                <button id="navigate-button" onClick={routeChange}>To Friends Page</button>
            </div>
            
            <div className="friends">
                <div className="friend">
                    <img className="friend-image" src={"/images/user-icons/giraffe.png"} alt="image not found" />
                    <div className="user-descriptor">
                        <label id="friend-name">Malcolm Zhao</label> <br />
                        <label id="friend-description">Student at UBC, major in Comp. Sci. And Math.</label>
                    </div>
                </div>
                <div className="friend">
                    <img className="friend-image" src={"/images/user-icons/ghost.png"} alt="image not found" />
                    <div className="user-descriptor">
                        <label id="friend-name">Wonhak Choi</label> <br />
                        <label id="friend-description">Student at UBC, majoring in Computer Science.</label>
                    </div>
                </div>
                <div className="friend">
                    <img className="friend-image" src={"/images/user-icons/panda.png"} alt="image not found" />
                    <div className="user-descriptor">
                        <label id="friend-name">Tammy Kim</label> <br />
                        <label id="friend-description">Student at UBC, majoring in Computer Science.</label>
                    </div>
                </div>
                <div className="friend">
                    <img className="friend-image" src={"/images/user-icons/chick.png"} alt="image not found" />
                    <div className="user-descriptor">
                        <label id="friend-name">Wendy Shen</label> <br />
                        <label id="friend-description">Student at UBC, majoring in Computer Science.</label>
                    </div>
                </div>
            </div>
            <div className="restaurants-header">
                <label id="restaurant-title">Your Restaurants</label>
            </div>
            <ul className="restaurants">
                <div><li className="item">
                    <label className="restaurant-name">Rain or Shine</label><br /> 
                    <label className="restaurant-description">Address: 6001 University Blvd</label> <br /> 
                    <label className="restaurant-rating">Rating: 4.2⭐</label> <br />
                    <img src="https://scontent.fyvr3-1.fna.fbcdn.net/v/t39.30808-6/298627466_604286454418119_5290469191731890042_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=69VQBw_8KLgAX8DFgi3&_nc_ht=scontent.fyvr3-1.fna&oh=00_AfBOJA59zcjiX6wo-5c9-8h73KODnO1UKlhz-yxhFvRgjg&oe=649B6106" alt="URL not found" width="450" height="400" />
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
};