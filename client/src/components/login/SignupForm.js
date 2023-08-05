import { useNavigate } from "react-router-dom";
import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useCookies} from "react-cookie";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import RestaurantMenuOutlinedIcon from "@mui/icons-material/RestaurantMenuOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Alert } from "@mui/material";
import {signupAsync} from "../../redux/thunks/authenticationThunks";

// resource used: https://mui.com/material-ui/getting-started/templates/

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Easy Eats
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const SignupForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstname] = useState('');
    const [lastName, setLastname] = useState('');
    const error = useSelector((state) => state.sauth.error);
    const isLoggedIn = useSelector((state) => state.sauth.isLoggedIn);
    const dispatch = useDispatch();
    const [cookies, setCookie] = useCookies([]);

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

  useEffect(() => {
    return () => {
      dispatch(verifySession(cookies));
      // Clear the error message when the component unmounts
      dispatch(clearMessage());
    };
  }, [dispatch]);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleFirstnameChange = (e) => {
    setFirstname(e.target.value);
  };
    const handleSubmit = (e) => {
        e.preventDefault();
        // Dispatch login action with email and password
        dispatch(signupAsync({email: email, password: password, firstName: firstName, lastName: lastName}))
            .then((data) => {
                let token = data.payload.token;
                setCookie('token', token);
            })
    };

  const handleLastnameChange = (e) => {
    setLastname(e.target.value);
  };

  
  if (isLoggedIn) {
    return (
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "success.main" }}>
          <RestaurantMenuOutlinedIcon />
        </Avatar>

        <Alert
          action={
            <Button href="/" color="inherit" size="small">
              HOME
            </Button>
          }
          sx={{ mt: 4 }}
        >
          You have registered successfully! Go to home page.
        </Alert>
      </Box>
    );
  }

  const theme = createTheme();

  return (
    <ThemeProvider theme={theme}>
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
          <Avatar
            sx={{ m: 1, bgcolor: "#A586D5", height: "5vh", width: "5vh" }}
          >
            <RestaurantMenuOutlinedIcon
              sx={{ color: "#FFF4BB", height: "4vh", width: "4vh" }}
            />
          </Avatar>

          <Typography component="h1" variant="h5" sx={{ fontSize: "4vh" }}>
            Sign up
          </Typography>

          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                {error && <Alert severity="error">{error}</Alert>}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  value={firstName}
                  onChange={handleFirstnameChange}
                  sx={{
                    height: "7vh",
                    width: "30vh",
                    "& label": { fontSize: "2vh", marginBottom: "1vh" },
                    "& input": { fontSize: "2vh" },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  value={lastName}
                  onChange={handleLastnameChange}
                  sx={{
                    height: "7vh",
                    width: "30vh",
                    "& label": { fontSize: "2vh", marginBottom: "1vh" },
                    "& input": { fontSize: "2vh" },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={handleEmailChange}
                  sx={{
                    height: "7vh",
                    width: "60vh",
                    "& label": { fontSize: "2vh", marginBottom: "1vh" }, 
                    "& input": { fontSize: "2vh" }, 
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={password}
                  onChange={handlePasswordChange}
                  sx={{
                    height: "7vh",
                    width: "60vh",
                    "& label": { fontSize: "2vh", marginBottom: "1vh" }, 
                    "& input": { fontSize: "2vh" }, 
                  }}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: "2vh",
                mb: "2vh",
                backgroundColor: "#8B69C1",
                height: "5vh",
                width: "15vh",
                fontSize: "2vh",
                "&:hover": {
                  backgroundColor: "#6B41AD",
                },
              }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="center">
              <Grid item>
                <Link
                  href="/login"
                  variant="body2"
                  sx={{ color: "#6B41AD", fontSize: "2vh" }}
                >
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: "4vh", mb: "2vh", fontSize: "1.5vh" }} />
      </Container>
    </ThemeProvider>
  );
};

export default SignupForm;
