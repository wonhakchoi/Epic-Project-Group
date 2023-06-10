import React from "react";
import "./Friend.css"

const Friend = ({ name, biography, rated_resturants }) => {

  return (
    <div className="friend">
      <h3>{name}</h3>
      <p className="biography">{biography}</p>
      <p className="rated-resturants">
      <b>Rated Restaurants:</b>
        {rated_resturants.map((result) => (
            <div>
                <label>{result.name}</label> <br />
            </div>
        ))}
      </p>
    </div>
  );
};

export default Friend;
