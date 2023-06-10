import {useState} from "react";
import RestaurantList from "../components/RestaurantList";
import "../components/ResturantList.css"

// Some sample data, this will need to be stored in database later
const initialResLists = [{name: "List1"}, {name: "List2"}, {name: "List3"}]

// Page for displaying all the user made lists of restaurants
export default function ResLists() {
    const [resLists, setResLists] = useState(initialResLists);

    function handleAddResList(newResList) {
        setResLists([
            ...resLists, newResList
        ])
    }

    const displayResLists = resLists.map(resList =>
        <RestaurantList listDetails={resList} key={resList.name}/>)

    return (
        <div id={"list-container"}>
            {displayResLists}
        </div>
    )

}