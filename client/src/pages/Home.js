import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box, Button, Typography, styled } from "@mui/material";
import { Link } from "react-router-dom";

import SearchBar from "../components/SearchBar";
import CollectionPopup from "../components/collections/CollectionPopup";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from "react-router-dom";
import {useCookies} from "react-cookie";
import LoadingUsers from "../components/users/LoadingUsers";
import RedirectLoading from "../components/login/redirectLoading";
import {postAuthAsync} from "../redux/thunks/authenticationThunks";

const Home = () => {
    const navigate = useNavigate();
    const [cookies, removeCookie] = useCookies(['token']);
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
                    removeCookie('token');
                    navigate('/login');
                }
                setState(STATES.COMPLETE);
            })
    }, [cookies, navigate, removeCookie]);


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

  if (state == STATES.LOADING) {
    return <LoadingUsers />;
  }

  return (
    <Box sx={{ display: "flex" }}>
      {/* Left Side */}
      <div style={{ width: "50%", height: "88vh", backgroundColor: "#C5BAF4" }}>
        <img
          src="/images/home-icons/eating.svg"
          alt="logo"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>

      {/* Right Side */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          p: 4,
          backgroundColor: "#C5BAF4",
          width: "50%",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontFamily: "Georgia, sans-serif",
            fontWeight: "bold",
            fontSize: "5vh",
            color: "#5D44CA",
            mb: "4vh",
          }}
        >
          Share Your Flavorful Journey of Dining Delights
        </Typography>
        <Typography
          variant="body1"
          sx={{
            mt: 2,
            fontFamily: "system-ui",
            fontSize: "2.5vh",
            fontWeight: "bold",
            color: "#ffffff",
          }}
        >
          Special culinary connections - where food and friends collide!
        </Typography>
        <Typography
          variant="body1"
          sx={{
            mt: 2,
            fontFamily: "system-ui",
            fontSize: "2.5vh",
            fontWeight: "bold",
            color: "#ffffff",
            mb: "4vh",
          }}
        >
          Connect, share, and explore. Your culinary adventure starts here 😋
        </Typography>

        <Link to="/search" style={{ textDecoration: "none", mt: "3vh" }}>
          <Button
            variant="contained"
            color="primary"
            sx={{
              fontSize: "2.5vh",
              padding: "10px 25px",
              backgroundColor: "#5D44CA",
              "&:hover": {
                backgroundColor: "#432C8F",
              },
            }}
          >
            Get Started ➔
          </Button>
        </Link>
      </Box>
    </Box>
  );
};

export default Home;
