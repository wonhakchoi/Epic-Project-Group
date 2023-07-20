import React from "react";
import SearchBar from "../components/SearchBar";
import CollectionPopup from "../components/collections/CollectionPopup";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const Home = () => {
    const navigate = useNavigate();
    const [cookies, removeCookie] = useCookies([]);
    const [username, setUsername] = useState("");

    useEffect(() => {
        const verifyCookie = async () => {
            if (!cookies.token) {
                navigate("/login");
            }
            try {
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
                    // console.log(response.data);
                    let data = response.data
                    const { status, user } = data;
                    // console.log(status);

                    setUsername(user);

                    if (status) {
                        console.log(user);
                        return <div>Hello {user}</div>
                    } else {
                        return (removeCookie("token"), navigate("/signup"));
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

    const Logout = () => {
        removeCookie("token");
        navigate("/signup");
    };

    // return <div>HOME</div>;
    const handleSearch = (searchTerm) => {
        // Perform search operations based on the searchTerm
        console.log('Performing search for:', searchTerm);
        // You can make an API request, update state, or perform any other logic here
    };

    return (
        <div>
            <br />
            <h4>
                {" "}
                Welcome <span>{username}</span>
            </h4>
            <button onClick={Logout}>LOGOUT</button>
            <SearchBar onSearch={handleSearch} />
            <CollectionPopup></CollectionPopup>
        </div>
    );
};

export default Home;
