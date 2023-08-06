import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { acceptIncomingAsync, rejectIncomingAsync } from "../../redux/thunks/usersThunks";
import "./Requests.css";
import "./Buttons.css";
import { Box, Card, CardActions, CardContent, Button, Typography, CardHeader, Divider, Grid } from '@mui/material';

const IncomingRequest = ({ id, icon, name, biography }) => {
    const icons = useSelector((state) => state.users.iconLocations);
    let currUser = useSelector((state) => state.sauth.currUser);
    const dispatch = useDispatch();

    return (
        <Card sx={{ width: 300, minHeight: 240, p: 1 }}>
            <CardHeader
                avatar={
                    <img className="user-icon" src={icons[Math.floor(Math.random() * icons.length)]} alt={name} />
                }
                title={
                    <Typography mr={6} variant="h6" component="h2">
                        {name}
                    </Typography>
                }
            />
            <CardContent>
                <Typography color="body2" variant="caption">
                    {biography}
                </Typography>

                <Divider variant="middle" sx={{ mt: 1, mb: 1 }} />

                <Grid
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    spacing={1}
                    fullWidth
                    sx={{ mt: 3 }}
                >
                    <Grid item xs={6}>
                        <Button
                            variant="outlined"
                            color="success"
                            sx={{ minWidth: '30vh', minHeight: '6vh' }}
                            onClick={() => dispatch(acceptIncomingAsync({ userID: currUser, otherID: id }))}
                        >
                            Accept
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button
                            sx={{ minWidth: '30vh', minHeight: '6vh' }}
                            variant="outlined"
                            color="error"
                            onClick={() => dispatch(acceptIncomingAsync({ userID: currUser, otherID: id }))}>
                            Cancel
                        </Button>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

export default IncomingRequest;
