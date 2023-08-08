import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import { Typography, Grid, Container, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";

export default function EditReview() {
    const { ratingID } = useParams();
    let navigate = useNavigate();
    let [user, setUser] = useState({});
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [bio, setBio] = useState('');

    const userID = useSelector((state) => state.sauth.currUser);
    const dispatch = useDispatch();

    useEffect(() => {
        // const fetchUserRatings = async () => {
        //     try {
        //         const userData = await UserService.getUserByID(userID);
        //         setUser(userData);
        //         setFirstName(userData.data[0].firstName);
        //         setLastName(userData.data[0].lastName);
        //         setEmail(userData.data[0].email);
        //         setBio(userData.data[0].biography);
        //     } catch (error) {
        //         // Handle any errors that might occur during the promise resolution
        //         console.error("Error fetching user data:", error);
        //     }
        // };

        // fetchUserRatings();
    }, [])

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
            biography: bio
        };
        // dispatch(editProfileAsync({userID: userID, body: body}));
        navigate('/profile');
    };

    return (
        <div>
            <Typography variant="h4" component="div" sx={{ mt: 6 }}>
                Edit Review
            </Typography>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: "10vh",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <Box
                        component="form"
                        noValidate
                        onSubmit={handleUpdate}
                        sx={{ mt: 3 }}
                    >
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
                                />
                            </Grid>
                            <Grid item xs={12} sx={{ mt: 1 }}>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{
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
                </Box>
            </Container>
        </div>
    );


    // if (user.data !== undefined) {
    //     return (
    //         <div>
    //             <Typography variant="h4" component="div" sx={{ mt: 6 }}>
    //                 Edit Profile
    //             </Typography>
    //             <Container component="main" maxWidth="xs">
    //                 <CssBaseline />
    //                 <Box
    //                     sx={{
    //                         marginTop: "10vh",
    //                         display: "flex",
    //                         flexDirection: "column",
    //                         alignItems: "center",
    //                         justifyContent: "center",
    //                     }}
    //                 >
    //                     <Box
    //                         component="form"
    //                         noValidate
    //                         onSubmit={handleUpdate}
    //                         sx={{ mt: 3 }}
    //                     >
    //                         <Grid container spacing={2}>
    //                             {/* <Grid item xs={12}>
    //                                 {error && <Alert severity="error">{error}</Alert>}
    //                             </Grid> */}
    //                             <Grid item xs={12} sm={6}>
    //                                 <TextField
    //                                     autoComplete="given-name"
    //                                     name="firstName"
    //                                     fullWidth
    //                                     id="firstName"
    //                                     label="First Name"
    //                                     autoFocus
    //                                     value={firstName}
    //                                     onChange={handleFirstnameChange}
    //                                 />
    //                             </Grid>
    //                             <Grid item xs={12} sm={6}>
    //                                 <TextField
    //                                     fullWidth
    //                                     id="lastName"
    //                                     label="Last Name"
    //                                     name="lastName"
    //                                     autoComplete="family-name"
    //                                     value={lastName}
    //                                     onChange={handleLastnameChange}
    //                                 />
    //                             </Grid>
    //                             <Grid item xs={12}>
    //                                 <TextField
    //                                     fullWidth
    //                                     id="email"
    //                                     label="Email Address"
    //                                     name="email"
    //                                     autoComplete="email"
    //                                     value={email}
    //                                     onChange={handleEmailChange}
    //                                 />
    //                             </Grid>
    //                             <Grid item xs={12}>
    //                                 <TextField
    //                                     fullWidth
    //                                     name="bio"
    //                                     label="Biography"
    //                                     id="bio"
    //                                     multiline
    //                                     rows={3}
    //                                     value={bio}
    //                                     onChange={handleBioChange}
    //                                 />
    //                             </Grid>
    //                             <Grid item xs={12} sx={{ mt: 1 }}>
    //                                 <Button
    //                                     type="submit"
    //                                     fullWidth
    //                                     variant="contained"
    //                                     sx={{
    //                                         backgroundColor: "#8B69C1",
    //                                         "&:hover": {
    //                                             backgroundColor: "#6B41AD",
    //                                         },
    //                                     }}
    //                                 >
    //                                     Update
    //                                 </Button>
    //                             </Grid>
    //                         </Grid>
    //                     </Box>
    //                 </Box>
    //             </Container>
    //         </div>
    //     );
    // }
};