import React from "react";
import { useSelector } from "react-redux";
import Friend from "./Friend";
import "./FriendsList.css";
import { Typography, Grid, Box } from "@mui/material";

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
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    p: 1,
                    m: 1,
                    bgcolor: 'background.paper',
                    borderRadius: 1,
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                }}
            >
                <Typography>Item 1</Typography>
                <Typography>Item 2</Typography>
                <Typography>Item 3</Typography>
            </Box>

            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"

                // container
                // justifyContent="center"
                // alignItems="center"
                // spacing={1}
                // rowSpacing={3}
                spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}
                sx={{ mb: 8 }}
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
            </Grid>

        </div>
    );
};

export default FriendsList;
