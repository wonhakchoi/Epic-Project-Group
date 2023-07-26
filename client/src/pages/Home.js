import React from "react";
import SearchBar from "../components/SearchBar";
import CollectionPopup from "../components/collections/CollectionPopup";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import LoadingUsers from "../components/users/LoadingUsers";
import RedirectLoading from "../components/login/redirectLoading";

const Home = () => {
    const navigate = useNavigate();
    const [cookies, removeCookie] = useCookies([]);
    const [username, setUsername] = useState("");
    const { error, user, loggedIn, isAuthenticated } = useSelector((state) => state.authentication.authentication);
    const STATES = {
        LOADING: "loading",
        REDIRECTING: "redirecting",
        COMPLETE: "complete",
    };

    const [state, setState] = useState(STATES.LOADING);


    useEffect(() => {
        const verifyCookie = async () => {
            if (!cookies.token) {
                navigate("/login");
                setState(STATES.COMPLETE);
            }
            try {
                // https://stackoverflow.com/questions/42474262/cors-issue-with-external-api-works-via-postman-but-not-http-request-with-axios
                return axios("http://localhost:3001/auth/", {
                    method: 'POST',
                    mode: 'no-cors',
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Content-Type': 'application/json',
                    },
                    credentials: 'same-origin',
                    withCredentials: true
                }).then(response => {
                    console.log(response.data);
                    let data = response.data
                    const { status, user } = data;
                    console.log(status);

                    // setUsername(user.firstName);

                    if (status) {
                        // setLoaded(true);
                        setUsername(user.firstName);
                        setState(STATES.COMPLETE);
                        console.log(user);
                        return <div>Hello {user.firstName}</div>
                    } else {
                        // setLoaded(true);
                        setState(STATES.COMPLETE);
                        return (removeCookie("token"), navigate("/login"));
                    }
                })
                // const { status, user } = data;
                // console.log(status);
                // console.log("user");
                // console.log(user);

            } catch (err) {
                console.log(err);
            }

            // setUsername(user);

            // if (status) {
            //     console.log(user);
            //     return <div>Hello {user}</div>
            // } else {
            //     return (removeCookie("token"), navigate("/signup"));
            // }

            // return status
            //     ? toast(`Hello ${user}`, {
            //         position: "top-right",
            //     })
            //     : (removeCookie("token"), navigate("/login"));
        };
        verifyCookie();
    }, [cookies, navigate, removeCookie]);


    // return <div>HOME</div>;
    const handleSearch = (searchTerm) => {
        // Perform search operations based on the searchTerm
        console.log('Performing search for:', searchTerm);
        // You can make an API request, update state, or perform any other logic here
    };

    if (state == STATES.LOADING) {
        return (
            <LoadingUsers />
        );
    }

    return (
        <div>
            {state === STATES.REDIRECTING ? (
                <LoadingUsers />
            ) : (
                <div>
                    <br />
                    <h4>
                        {" "}
                        Welcome <span>{username}</span>
                    </h4>
                    <SearchBar onSearch={handleSearch} />
                    <CollectionPopup></CollectionPopup>
                </div>
            )}
        </div>
    );
};

export default Home;
