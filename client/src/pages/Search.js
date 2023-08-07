import React, {useEffect, useState} from "react";
import SearchBar from "../components/SearchBar";
import CollectionPopup from "../components/collections/CollectionPopup";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {useCookies} from "react-cookie";
import {postAuthAsync} from "../redux/thunks/authenticationThunks";
import LoadingUsers from "../components/users/LoadingUsers";

const Search = () => {
    const [loaded, setLoaded] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [cookies, removeCookie] = useCookies([]);

    useEffect(() => {
        dispatch(postAuthAsync(cookies.token))
            .then((data) => {
                const s = data.payload.status;
                if (s) {
                    setLoaded(true);
                } else {
                    removeCookie('token');
                    navigate('/login');
                }
            })
    }, [cookies, navigate, removeCookie]);


    const handleSearch = (searchTerm) => {
        // Perform search operations based on the searchTerm
        console.log('Performing search for:', searchTerm);
        // You can make an API request, update state, or perform any other logic here
    };

    if (!loaded) {
        return (<LoadingUsers/>);
    }

    return (
        <div>
            <br/>
            <SearchBar onSearch={handleSearch}/>
            <CollectionPopup></CollectionPopup>
        </div>
    );
};

export default Search;
