import React, {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import EditProfilePage from "../components/profile/EditProfilePage";
import {useNavigate} from "react-router-dom";
import {useCookies} from "react-cookie";
import LoadingUsers from "../components/users/LoadingUsers";
import {postAuthAsync} from "../redux/thunks/authenticationThunks";

const EditProfile = () => {
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

    return (
        <div className="friends-container">
            {!loaded ? (
                <LoadingUsers/>
            ) : (
                <div>
                    <EditProfilePage/>
                </div>
            )}
        </div>
    );
};

export default EditProfile;
