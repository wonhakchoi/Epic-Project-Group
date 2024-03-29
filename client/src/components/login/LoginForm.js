import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useCookies} from "react-cookie";

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import RestaurantMenuOutlinedIcon from '@mui/icons-material/RestaurantMenuOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {Alert} from '@mui/material';
import {loginAsync} from "../../redux/thunks/authenticationThunks";
import LoadingUsers from "../users/LoadingUsers";

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

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const error = useSelector((state) => state.sauth.error);
    const isLoggedIn = useSelector((state) => state.sauth.isLoggedIn);
    const dispatch = useDispatch();

    const [cookies, setCookie] = useCookies(['token']);
    const [loaded, setLoaded] = useState(true);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

    const handleSubmit = (e) => {
        setLoaded(false);
        e.preventDefault();
        // Dispatch login action with email and password
        dispatch(loginAsync({email: email, password: password}))
            .then((data) => {
                // set cookie on fulfill
                let token = data.payload.token;
                setCookie('token', token);
            })
            .finally(() => {
                setEmail('');
                setPassword('');
            })
        setLoaded(true);
    };

  if (!loaded) {
      return <LoadingUsers />;
  }

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
        <Avatar sx={{ m: 1, color: "#A191EB" }}>
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
          You have logged in successfully! Go to home page.
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
            Sign In
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <Grid item xs={12}>
              {error && <Alert severity="error">{error}</Alert>}
            </Grid>
            <TextField
              margin="dense" // Use dense margin for compact spacing
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={handleEmailChange}
              value={email}
              sx={{
                height: "7vh",
                width: "60vh",
                "& label": { fontSize: "2vh", marginBottom: "1vh" },
                "& input": { fontSize: "2vh" },
              }}
            />
            <TextField
              margin="dense"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={handlePasswordChange}
              value={password}
              sx={{
                height: "7vh",
                width: "60vh",
                "& label": { fontSize: "2vh", marginBottom: "1vh" },
                "& input": { fontSize: "2vh" },
              }}
            />
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
              Login
            </Button>
            <Grid container>
              <Grid item xs>
                <Link
                  href="#"
                  variant="body2"
                  sx={{ color: "#6B41AD", fontSize: "2vh" }}
                >
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link
                  href="/signup"
                  variant="body2"
                  sx={{ color: "#6B41AD", fontSize: "2vh" }}
                >
                  {"Don't have an account? Sign Up"}
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

export default LoginForm;
