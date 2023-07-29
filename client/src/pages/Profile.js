import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import ProfilePage from "../components/profile/ProfilePage";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import LoadingUsers from "../components/users/LoadingUsers";
import {baseURL} from "../redux/services/backendURL";


const Friends = () => {
    const [loaded, setLoaded] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [cookies, removeCookie] = useCookies([]);

    useEffect(() => {
        const verifyCookie = async () => {
            console.log("POST auth")

            if (!cookies.token) {
                navigate("/login");
            }
            try {
                // https://stackoverflow.com/questions/42474262/cors-issue-with-external-api-works-via-postman-but-not-http-request-with-axios
                return axios("https://easy-eats-backend-9u5y.onrender.com/auth/", {
                // return axios("http://localhost:3001/auth/", {
                    method: 'POST',
                    mode: 'no-cors',
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Content-Type': 'application/json',
                    },
                    credentials: 'same-origin',
                    withCredentials: true
                }).then(response => {
                    let data = response.data
                    const { status, user } = data;

                    if (status) {
                        setLoaded(true);
                    } else {
                        setLoaded(true);
                        return (removeCookie("token"), navigate("/login"));
                    }
                })

            } catch (err) {
                console.log(err);
            }
        };
        verifyCookie();
    }, [cookies, navigate, removeCookie]);


    return (
        <div className="friends-container">
            {!loaded ? (
                <LoadingUsers />
            ) : (
                <div>
                    <ProfilePage />
                </div>
            )}
            
        </div>
    );
};

export default Friends;
