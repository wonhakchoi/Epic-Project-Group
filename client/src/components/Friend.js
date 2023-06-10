import React from "react";
import "./Friend.css"

const Friend = ({ name, biography, rated_restaurants }) => {

  return (
    <div className="friend">
      <h3>{name}</h3>
      <p className="biography">{biography}</p>
      <p className="rated-restaurants">
      <b>Rated Restaurants:</b>
        {rated_restaurants.map((result) => (
            <div>
                <label>{result.name}</label> <br />
            </div>
        ))}
      </p>
    </div>
  );
};

export default Friend;
