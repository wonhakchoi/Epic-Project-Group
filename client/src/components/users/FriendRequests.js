import React from "react";
import { useSelector } from "react-redux";
import OutgoingRequest from "./OutgoingRequest";
import IncomingRequest from "./IncomingRequest";
import "./FriendRequests.css";
import { Typography, Divider, Box, Container } from "@mui/material";

const FriendRequests = () => {
    const outRequestsSlice = useSelector((state) => state.users.outgoingRequests);
    const inRequestsSlice = useSelector((state) => state.users.incomingRequests);
    const usersSlice = useSelector((state) => state.users.allUsers);

    return (
        <div>
            <Typography
                variant="h4"
                component="div"
                sx={{ mb: 5, mt: 5 }}
            >
                Pending Requests
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
                {outRequestsSlice.outgoingRequests.map((id) => {
                    const user = usersSlice.users.filter((user) => user._id === id)[0];
                    return (
                        <OutgoingRequest
                            key={id}
                            id={id}
                            icon={user.icon}
                            name={user.firstName}
                            biography={user.biography}
                        />
                    );
                })}
            </Box>

            <Divider variant="middle" />

            <Typography
                variant="h4"
                component="div"
                sx={{ mb: 5, mt: 5 }}
            >
                Incoming Requests
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
                {inRequestsSlice.incomingRequests.map((id) => {
                    const user = usersSlice.users.filter((user) => user._id === id)[0];
                    return (
                        <IncomingRequest
                            key={id}
                            id={id}
                            icon={user.icon}
                            name={user.firstName}
                            biography={user.biography}
                        />
                    );
                })}
            </Box>

            <Divider variant="middle" />

        </div>
    );
};

export default FriendRequests;
