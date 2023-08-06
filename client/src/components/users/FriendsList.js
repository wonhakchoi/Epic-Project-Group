import React from "react";
import { useSelector } from "react-redux";
import Friend from "./Friend";
import "./FriendsList.css";
import { Typography, Grid, Box, Container } from "@mui/material";
import { flexbox } from '@mui/system';


const FriendsList = () => {
    const friendsSlice = useSelector((state) => state.users.userFriends);
    const usersSlice = useSelector((state) => state.users.allUsers);

    return (
        <div>
            <Typography
                variant="h4"
                component="div"
                sx={{ mb: 5, mt: 5 }}
            >
                Your Friends
            </Typography>


            <Box
                display="flex"
                justifyContent="center"
                alignItems="start"
                minHeight="12vh"
                gap={5}
                sx={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    mb: 8,
                }}
            >

                {friendsSlice.friends.map((id) => {
                    const user = usersSlice.users.filter((user) => user._id === id)[0];
                    // console.log(user);
                    return (
                        <Friend
                            key={id}
                            id={id}
                            icon={user.icon}
                            name={user.firstName}
                            biography={user.biography}
                            ratedRestaurants={user.ratedRestaurants}
                        />
                    );
                })}
                {/* </Grid> */}
            </Box>

        </div>
    );
};

export default FriendsList;
