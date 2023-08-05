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
                alignItems="center"
                minHeight="12vh"
                // display="grid"
                // gridTemplateColumns="repeat(12, 1fr)"
                gap={5}
                sx={{
                    // display: 'flex',
                    flexDirection: 'row',
                    // p: 1,
                    // m: 1,
                    // bgcolor: 'background.paper',
                    // borderRadius: 1,
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    // ml: 5,
                    // maxWidth: 800,
                }}
            >

                <Friend
                    key={123}
                    id={usersSlice._id}
                    icon={123}
                    name={123}
                    biography={123}
                    ratedRestaurants={123}
                />
                <Friend
                    key={123}
                    id={usersSlice._id}
                    icon={123}
                    name={123}
                    biography={123}
                    ratedRestaurants={123}
                />
                <Friend
                    key={123}
                    id={usersSlice._id}
                    icon={123}
                    name={123}
                    biography={123}
                    ratedRestaurants={123}
                />
                <Friend
                    key={123}
                    id={usersSlice._id}
                    icon={123}
                    name={123}
                    biography={123}
                    ratedRestaurants={123}
                />
                <Friend
                    key={123}
                    id={usersSlice._id}
                    icon={123}
                    name={123}
                    biography={123}
                    ratedRestaurants={123}
                />
                <Friend
                    key={123}
                    id={usersSlice._id}
                    icon={123}
                    name={123}
                    biography={123}
                    ratedRestaurants={123}
                />
            </Box>

            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    p: 1,
                    m: 1,
                    bgcolor: 'background.paper',
                    borderRadius: 1,
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    maxWidth: 800,
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
