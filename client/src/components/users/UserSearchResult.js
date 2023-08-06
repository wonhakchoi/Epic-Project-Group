import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Status } from "../../utils/userUtils";
import { acceptIncomingAsync, sendOutgoingAsync } from "../../redux/thunks/usersThunks";
import "./UserSearchResult.css";
import { Typography, Grid } from "@mui/material";

const UserSearchResult = ({ id, icon, name, status }) => {
    const icons = useSelector((state) => state.users.iconLocations);
    let currUser = useSelector((state) => state.sauth.currUser);
    const dispatch = useDispatch();

    return (
        <div>
            <Grid container spacing={0} >
                <Grid item xs={3}>
                    <img className="user-search-icon" src={icons[icon]} alt={name} />
                </Grid>
                <Grid item xs={6}>
                    <Typography
                        // variant="body1"
                        variant="h6"
                        component="div"
                    >
                        {name}
                    </Typography>
                </Grid>
                <Grid item xs={2}>
                    {status === Status.FRIEND ? (
                        <div className="user-container">
                            <img className="friends-icon" src="/images/web-icons/friend.png" alt="Friends!"></img>
                            <p className="friend-text">Friends</p>
                        </div>
                    ) : status === Status.OUTGOING ? (
                        <div className="user-container">
                            <img className="friends-icon" src="/images/web-icons/pending.png" alt="Pending"></img>
                            <p className="friend-text">Pending</p>
                        </div>
                    ) : status === Status.INCOMING ? (
                        <div className="user-container">
                            <img
                                className="friends-icon confirm-icon"
                                src="/images/web-icons/confirm.png"
                                alt="Requested"
                                onClick={() => dispatch(acceptIncomingAsync({ userID: currUser, otherID: id }))}
                            ></img>
                            <p className="friend-text">Accept Request?</p>
                        </div>
                    ) : (
                        <div className="user-container">
                            <img
                                className="friends-icon add-friend-icon"
                                src="/images/web-icons/addFriend.png"
                                alt="Add Friend"
                                onClick={() => dispatch(sendOutgoingAsync({ userID: currUser, otherID: id }))}
                            ></img>
                            <p className="friend-text">Add Friend</p>
                        </div>
                    )}

                </Grid>
            </Grid>
        </div>
    );
};

export default UserSearchResult;
