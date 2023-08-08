import React, { useState, useEffect } from "react";
import "./ProfilePage.css";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import UserService from "../../redux/services/usersService";
// import { editBiographyAsync } from "../../redux/thunks/usersThunks";
import { editProfileAsync, editIconAsync } from "../../redux/thunks/usersThunks";

import { Typography, Grid, Container, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";

export default function EditProfilePage() {
    let navigate = useNavigate();
    let [user, setUser] = useState({});
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [bio, setBio] = useState("");

    const userID = useSelector((state) => state.sauth.currUser);
    const icons = useSelector((state) => state.users.iconLocations);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchUserRatings = async () => {
            try {
                const userData = await UserService.getUserByID(userID);
                setUser(userData);
                setFirstName(userData.data[0].firstName);
                setLastName(userData.data[0].lastName);
                setEmail(userData.data[0].email);
                setBio(userData.data[0].biography);
            } catch (error) {
                // Handle any errors that might occur during the promise resolution
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserRatings();
    }, []);

    const handleFirstnameChange = (e) => {
        setFirstName(e.target.value);
    };

    const handleLastnameChange = (e) => {
        setLastName(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleBioChange = (e) => {
        setBio(e.target.value);
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        const body = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            biography: bio,
        };
        dispatch(editProfileAsync({ userID: userID, body: body }));
        navigate("/profile");
    };

    if (user.data !== undefined) {
        return (
            <Box
                sx={{
                    backgroundColor: "#C5BAF4",
                    minHeight: "90vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Container component="main" maxWidth="sm">
                    <CssBaseline />
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: "#FFFFFF",
                            padding: "2vh",
                            borderRadius: "2vh",
                            boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.16)",
                        }}
                    >
                        <Typography variant="h4" component="div" sx={{ mt: "2vh", fontSize: "4vh" }}>
                            Edit Profile
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleUpdate} sx={{ mt: "3vh" }}>
                            <Grid container spacing={2}>
                                {/* <Grid item xs={12}>
                                    {error && <Alert severity="error">{error}</Alert>}
                                </Grid> */}
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        autoComplete="given-name"
                                        name="firstName"
                                        fullWidth
                                        id="firstName"
                                        label="First Name"
                                        autoFocus
                                        value={firstName}
                                        onChange={handleFirstnameChange}
                                        sx={{
                                            marginBottom: "2vh",
                                            "& input": {
                                                fontSize: "2vh",
                                            },
                                            "& label": {
                                                fontSize: "2vh",
                                            },
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        id="lastName"
                                        label="Last Name"
                                        name="lastName"
                                        autoComplete="family-name"
                                        value={lastName}
                                        onChange={handleLastnameChange}
                                        sx={{
                                            marginBottom: "2vh",
                                            "& input": {
                                                fontSize: "2vh",
                                            },
                                            "& label": {
                                                fontSize: "2vh",
                                            },
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        autoComplete="email"
                                        value={email}
                                        onChange={handleEmailChange}
                                        sx={{
                                            marginBottom: "2vh",
                                            "& input": {
                                                fontSize: "2vh",
                                            },
                                            "& label": {
                                                fontSize: "2vh",
                                            },
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        name="bio"
                                        label="Biography"
                                        id="bio"
                                        multiline
                                        rows={3}
                                        value={bio}
                                        onChange={handleBioChange}
                                        sx={{
                                            marginBottom: "2vh",
                                            "& input": {
                                                fontSize: "2vh",
                                            },
                                            "& label": {
                                                fontSize: "2vh",
                                            },
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sx={{ mt: 1 }}>
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        sx={{
                                            fontSize: "1.8vh",
                                            backgroundColor: "#8B69C1",
                                            "&:hover": {
                                                backgroundColor: "#6B41AD",
                                            },
                                        }}
                                    >
                                        Update
                                    </Button>
                                </Grid>
                            </Grid>
                        </Box>
                        <Typography variant="h2" gutterBottom>
                            Choose your icon!
                        </Typography>
                        <Grid container spacing={2}>
                            {icons.map((icon, index) => (
                                <Grid item xs={6} sm={3} key={index}>
                                    <img
                                        src={icon}
                                        alt={`User Icon ${index}`}
                                        onClick={() => dispatch(editIconAsync({ userID, iconID: index }))}
                                        style={{ width: "100%", cursor: "pointer" }}
                                    />
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                </Container>
            </Box>
        );
    }
}
