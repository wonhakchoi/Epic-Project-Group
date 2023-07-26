import React from "react";
import DiscoverRatings from "../components/ratings/DiscoverRatings";

// Discover page for users to see ratings from other people
const Discover = () => {
    return <DiscoverRatings />;
};

export default Discover;

// https://stackoverflow.com/questions/73002902/api-getting-called-twice-in-react#:~:text=The%20cause%20of%20the%20issue,which%20call%20the%20API%20twice.
// shouldFetch ref hook called due to React StrictMode
