import React, {useState, useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';
import {login, setMessage, clearMessage, verifySession} from '../../redux/actions/authActions';
import {useCookies} from "react-cookie";
import LoadingUsers from '../users/LoadingUsers';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import RestaurantMenuOutlinedIcon from '@mui/icons-material/RestaurantMenuOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {Alert} from '@mui/material';
import {loginAsync} from "../../redux/thunks/authenticationThunks";
import {setError} from "../../redux/reducers/authenticationSlice";

// resource used: https://mui.com/material-ui/getting-started/templates/

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Easy Eats
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
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

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Dispatch login action with email and password
        dispatch(loginAsync({email: email, password: password}))
            .unwrap()
            .then((data) => {
                // set cookie on fulfill
                let token = data.payload.token;
                setCookie('token', token);
            })
            .catch((e) => {
                console.error(e.message);
            })
            .finally(() => {
                setEmail('');
                setPassword('');
            })
    };

    if (isLoggedIn) {
        return (
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{m: 1, bgcolor: 'success.main'}}>
                    <RestaurantMenuOutlinedIcon/>
                </Avatar>

                <Alert
                    action={
                        <Button href="/" color="inherit" size="small">
                            HOME
                        </Button>
                    }
                    sx={{mt: 4}}
                >
                    You have logged in successfully! Go to home page.
                </Alert>
                {/* <button onClick={Logout}>LOGOUT</button> */}
            </Box>
        )
    }

    const defaultTheme = createTheme();

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{m: 1, bgcolor: 'success.main'}}>
                        {/* <LockOutlinedIcon /> */}
                        <RestaurantMenuOutlinedIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Log in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
                        <Grid item xs={12}>
                            {error && <Alert severity="error">{error}</Alert>}
                        </Grid>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            onChange={handleEmailChange}
                            value={email}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={handlePasswordChange}
                            value={password}
                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                        >
                            Log In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="/signup" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{mt: 8, mb: 4}}/>
            </Container>
        </ThemeProvider>
    );

    //   return (
    //     <form onSubmit={handleSubmit}>
    //       <input type="email" value={email} onChange={handleEmailChange} />
    //       <input type="password" value={password} onChange={handlePasswordChange} />
    //       <button type="submit">Login</button>
    //     </form>
    //   );
};

export default LoginForm;
