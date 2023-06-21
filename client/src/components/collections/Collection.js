import "./Collection.css"

// Component for each Restaurant List Card
export default function Collection({collectionDetails: collectionDetails}) {
    function handleButtonClick() {
        console.log(collectionDetails.name + " button clicked!")
    }
    return (
        // TODO: display images in the background and make it a nice grid
        <div className={"collection-card"}>
            <button className={"collection-button"} onClick={handleButtonClick}>
                <h2 className={"collection-title"}> {collectionDetails.name} </h2>
            </button>
        </div>

    )
}