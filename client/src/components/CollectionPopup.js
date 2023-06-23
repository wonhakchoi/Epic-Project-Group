// pop up for displaying collections on the home page when add
import {useSelector} from "react-redux";

export default function CollectionPopup({restaurant}) {
    const userCollections = useSelector(state => state.collections.collections)
    const isVisible = useSelector(state => state.home.addCollectionVisible)

    function addToCollection(collection) {
        alert("you pressed: " + collection.name)
    }

    const collectionComponents = userCollections?.map(collection => (
        <button key={collection.id} onClick={() => addToCollection(collection)}> Add to {collection.name} </button>
    ))

    if (isVisible) {
        return <div className={'collection-popup'}>
            {collectionComponents}
        </div>
    }

    return <> </>
}
