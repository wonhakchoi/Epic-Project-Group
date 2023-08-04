
import React, {useEffect, useState} from "react";
import {useDispatch} from "react-redux";

import ProfilePage from "../components/profile/ProfilePage";
import {useNavigate} from "react-router-dom";
import {useCookies} from "react-cookie";
import LoadingUsers from "../components/users/LoadingUsers";
import {postAuthAsync} from "../redux/thunks/authenticationThunks";

const Friends = () => {
    const [loaded, setLoaded] = useState(false);
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

    return (
        <div className="friends-container">
            {!loaded ? (
                <LoadingUsers/>
            ) : (
                <div>
                    <ProfilePage/>
                </div>
            )}
        </div>
    );
};

export default Friends;
