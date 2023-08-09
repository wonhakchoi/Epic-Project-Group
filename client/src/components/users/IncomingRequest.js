import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { acceptIncomingAsync, rejectIncomingAsync } from "../../redux/thunks/usersThunks";
import "./Requests.css";
import "./Buttons.css";
import { Card, CardContent, Button, Typography, CardHeader, Divider, Grid } from "@mui/material";

const IncomingRequest = ({ id, icon, name, biography }) => {
    const icons = useSelector((state) => state.users.iconLocations);
    let currUser = useSelector((state) => state.sauth.currUser);
    const dispatch = useDispatch();

    return (
        <Card sx={{ width: 300, minHeight: 240, p: 1 }}>
            <CardHeader
                avatar={
                    <Link to={`/users/${id}`} style={{ textDecoration: "none", color: "inherit" }}>
                        <img className="user-icon" src={icons[icon]} alt={name} />
                    </Link>
                }
                title={
                    <Typography mr={6} variant="h6" component="h2">
                        <Link to={`/users/${id}`} style={{ textDecoration: "none", color: "inherit" }}>
                            {name}
                        </Link>
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
                            sx={{ minWidth: "30vh", minHeight: "6vh" }}
                            onClick={() => dispatch(acceptIncomingAsync({ userID: currUser, otherID: id }))}
                        >
                            Accept
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button
                            sx={{ minWidth: "30vh", minHeight: "6vh" }}
                            variant="outlined"
                            color="error"
                            onClick={() => dispatch(rejectIncomingAsync({ userID: currUser, otherID: id }))}
                        >
                            Cancel
                        </Button>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

export default IncomingRequest;
