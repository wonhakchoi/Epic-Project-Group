import "./RestaurantList.css"

// Component for each Restaurant List Card
export default function RestaurantList({listDetails}) {
    function handleButtonClick() {
        console.log(listDetails.name + " button clicked!")
    }
    return (
        // TODO: display images in the background and make it a nice grid
        <div className={"resList-card"}>
            <button className={"resList-button"} onClick={handleButtonClick}>
                <h2 className={"resList-title"}> {listDetails.name} </h2>
            </button>
        </div>

    )
}