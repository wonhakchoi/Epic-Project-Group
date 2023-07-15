import {useDispatch, useSelector} from "react-redux";
import {hideForm, setCollectionName, setCollectionImg} from "../../redux/reducers/collectionsSlice";
import {Modal} from "@mui/material";
import {addNewCollectionAsync, getCollectionsAsync} from "../../redux/thunks/collectionsThunks";

// form for adding a new collection
export default function CollectionForm() {
    const isVisible = useSelector(state => state.collections.formVisible);
    const newCollectionName = useSelector(state => state.collections.newCollectionName);
    const newCollectionImg = useSelector(state => state.collections.newCollectionImg);
    const dispatch = useDispatch();

    function closeForm() {
        dispatch(hideForm());
    }

    function handleSubmit(event) {
        event.preventDefault();
        // dispatch(addCollection());
        dispatch(addNewCollectionAsync({name: newCollectionName, img: newCollectionImg}))
        dispatch(getCollectionsAsync())
        closeForm();
    }

    return <Modal open={isVisible} onClose={() => closeForm()}>
        <div className={'collection-form'}>
        <form onSubmit={handleSubmit}>
            <label>
                Collection Name:
                <input type={'text'} name={'collectionName'} onChange={e => dispatch(setCollectionName(e.target.value))}/>
            </label>
            <br/>
            <label>
                Collection Image:
                <input type={'text'} name={'collectionImg'} onChange={e => dispatch(setCollectionImg(e.target.value))}/>
            </label>
            <br/>
            <button type={'submit'}>
                Submit
            </button>
            <button type={'reset'}>
                Clear
            </button>
        </form>
        </div>
    </Modal>
}