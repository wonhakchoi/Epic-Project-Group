import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {Box, Button, Typography, styled} from "@mui/material";
import {Link} from "react-router-dom";

import SearchBar from "../components/SearchBar";
import CollectionPopup from "../components/collections/CollectionPopup";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from "react-router-dom";
import {useCookies} from "react-cookie";
import axios from "axios";
import LoadingUsers from "../components/users/LoadingUsers";
import RedirectLoading from "../components/login/redirectLoading";
import {postAuthAsync} from "../redux/thunks/authenticationThunks";

const Home = () => {
    const navigate = useNavigate();
    const [cookies, setCookie] = useCookies(['token']);
    const dispatch = useDispatch();
    const STATES = {
        LOADING: "loading",
        REDIRECTING: "redirecting",
        COMPLETE: "complete",
    };

    const [state, setState] = useState(STATES.LOADING);

    useEffect(() => {
        dispatch(postAuthAsync(cookies.token))
            .then((data) => {
                const s = data.payload.status;
                if (!s) {
                    setCookie('token', null)
                    navigate("/login");
                }
                setState(STATES.COMPLETE);
            })
    }, [cookies, navigate, setCookie]);


    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
    };

    const imageStyle = {
        width: "100%",
        height: "calc(140vw / 3)",
        objectFit: "cover",
        position: "relative",
    };

    const Overlay = styled("div")({
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.4)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
    });

    const buttonStyle = {
        color: "white",
        backgroundColor: "#1976D2",
        fontWeight: "bold",
        fontSize: "16px",
        padding: "10px 20px",
        borderRadius: "20px",
        marginTop: "10px",
    };

    if (state === STATES.LOADING) {
        return (
            <LoadingUsers/>
        );
    }

    return (
        <Box sx={{height: "calc(100vw / 3)"}}>
            <Slider {...settings}>
                <div>
                    <div style={imageStyle}>
                        <img
                            src="/images/home-icons/hamburger.jpg"
                            alt="hamburger"
                            style={{...imageStyle, zIndex: 0}}
                        />
                        <Overlay>
                            <Typography variant="h5" sx={{marginBottom: "10px"}}>
                                Discover the most affordable fast food restaurants
                            </Typography>
                            {/* <Button variant="contained" color="primary" style={buttonStyle}>
                Search
              </Button> */}
                        </Overlay>
                    </div>
                </div>
                <div>
                    <div style={imageStyle}>
                        <img
                            src="/images/home-icons/sushi.jpg"
                            alt="sushi"
                            style={{...imageStyle, zIndex: 0}}
                        />
                        <Overlay>
                            <Typography variant="h5" sx={{marginBottom: "10px"}}>
                                Discover the best sushi restaurants
                            </Typography>
                            {/* <Button variant="contained" color="primary" style={buttonStyle}>
                Search
              </Button> */}
                        </Overlay>
                    </div>
                </div>
                <div>
                    <div style={imageStyle}>
                        <img
                            src="/images/home-icons/pasta.jpg"
                            alt="pasta"
                            style={{...imageStyle, zIndex: 0}}
                        />
                        <Overlay>
                            <Typography variant="h5" sx={{marginBottom: "10px"}}>
                                Discover the coolest Italian restaurants
                            </Typography>
                            {/* <Button variant="contained" color="primary" style={buttonStyle}>
                Search
              </Button> */}
                        </Overlay>
                    </div>
                </div>
                <div>
                    <div style={imageStyle}>
                        <img
                            src="/images/home-icons/coffee.jpg"
                            alt="cafe"
                            style={{...imageStyle, zIndex: 0}}
                        />
                        <Overlay>
                            <Typography variant="h5" sx={{marginBottom: "10px"}}>
                                Discover cafés that serve the best coffee
                            </Typography>
                            {/* <Button variant="contained" color="primary" style={buttonStyle}>
                Search
              </Button> */}
                        </Overlay>
                    </div>
                </div>
            </Slider>

            <br/>
            <br/>
            <Box sx={{textAlign: "center", margin: "40px auto"}}>
                <Typography variant="h4">With EasyEats...</Typography>
                <Typography variant="body1" sx={{margin: "20px"}}>
                    You can discover all the restaurants that are right just for you.
                </Typography>
                <Typography variant="body1" sx={{marginBottom: "30px"}}>
                    Make your own custom collections that store your favourite food
                    places! Share them with your friends.
                </Typography>
            </Box>

            <Box sx={{textAlign: "center", margin: "20px auto"}}>
                <Link to="/search" style={{textDecoration: "none"}}>
                    <Button variant="contained" color="primary" sx={buttonStyle}>
                        Search!
                    </Button>
                </Link>
            </Box>
        </Box>
    );
};

export default Home;
