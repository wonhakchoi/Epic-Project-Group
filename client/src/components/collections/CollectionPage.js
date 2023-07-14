import {useSelector} from "react-redux";
import RestaurantCard from "../restaurants/RestaurantCard";

export default function CollectionPage() {
    const collectionDetails = useSelector(state => state.collections.currCollectionDetails)
    const restaurants = useSelector(state => state.collections.currRestaurants)

    const restaurantList = restaurants?.map((result) => (
            <RestaurantCard key={result._id} restaurant={result} />
        ))

    return <div>
        <h1> {collectionDetails.name} </h1>
        {restaurantList}
    </div>
}