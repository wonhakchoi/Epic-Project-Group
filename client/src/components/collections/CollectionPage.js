import {useSelector} from "react-redux";
import React from "react";
import RestaurantCard from "../RestaurantCard";

export default function CollectionPage() {
    const collectionDetails = useSelector(state => state.collections.currCollectionDetails)

    const restaurantList = collectionDetails.restaurants?.map((result) => (
            <RestaurantCard key={result.id} restaurant={result} />
        ))

    return <div>
        <h1> {collectionDetails.name} </h1>
        {restaurantList}
    </div>
}