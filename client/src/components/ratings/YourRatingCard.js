import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import RatingService from "../../redux/services/ratingsService";
import { deleteRatingsAsync } from "../../redux/thunks/ratingsThunks";

import { Rating, Typography, Grid, Container, CardMedia } from "@mui/material";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";

const YourRatingCard = ({
  id,
  restaurant,
  restaurantID,
  score,
  comment,
  date,
}) => {
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    setAnchorEl(null);
    navigate(`/ratings/${id}`);
  };

  const handleDelete = async () => {
    setAnchorEl(null);
    dispatch(deleteRatingsAsync(id));
  };

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };

  const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
    new Date(date)
  );

  // https://mui.com/material-ui/react-card/
  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      sx={{ marginTop: "30px" }}
    >
      {/* <Container maxWidth="sm"> */}
      <Card sx={{ width: "65vh", height: "30vh" }}>
        <CardHeader
          action={
            <>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <Tooltip title="Edit or delete review">
                  <IconButton
                    onClick={handleClick}
                    size="small"
                    sx={{ ml: 2 }}
                    aria-controls={open ? "account-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                  >
                    <MoreVertIcon
                      sx={{
                        fontSize: "3vh",
                        backgroundColor: "#ffffff",
                        textTransform: "none",
                      }}
                    />
                  </IconButton>
                </Tooltip>
              </Box>
              <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: "visible",
                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.22))",
                    mt: "1.5vh",
                    "& .MuiAvatar-root": {
                      width: "3vh",
                      height: "3vh",
                      ml: "-0.5vh",
                      mr: "1vh",
                    },
                    "&:before": {
                      content: '""',
                      display: "block",
                      position: "absolute",
                      top: 0,
                      right: "1.4vh",
                      width: "1vh",
                      height: "1vh",
                      bgcolor: "background.paper",
                      transform: "translateY(-50%) rotate(45deg)",
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              >
                <MenuItem onClick={handleEdit}>
                  <ListItemIcon>
                    <EditIcon
                      sx={{
                        fontSize: "2vh",
                        backgroundColor: "#ffffff",

                        textTransform: "none",
                      }}
                    />
                  </ListItemIcon>
                  <Typography variant="body1" sx={{ fontSize: "2vh" }}>
                    Edit review
                  </Typography>
                </MenuItem>
                <MenuItem onClick={handleDelete}>
                  <ListItemIcon>
                    <DeleteIcon
                      sx={{
                        fontSize: "2vh",
                        backgroundColor: "#ffffff",

                        textTransform: "none",
                      }}
                    />
                  </ListItemIcon>
                  <Typography variant="body1" sx={{ fontSize: "2vh" }}>
                    Delete review
                  </Typography>
                </MenuItem>
              </Menu>
            </>
          }
          subheader={
            <Typography
              mr={6}
              gutterBottom
              variant="body2"
              color="text.secondary"
              sx={{ fontSize: "1.5vh" }}
            >
              {formattedDate}
            </Typography>
          }
        />
        <CardContent>
          <Link
            to={`/restaurants/${restaurantID}`}
            style={{
              textDecoration: "none",
              color: "black",
            }}
          >
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              sx={{ fontSize: "3vh" }}
            >
              {restaurant}
            </Typography>
          </Link>
          <Rating
            name="read-only"
            value={score}
            readOnly
            precision={0.5}
            sx={{ fontSize: "3vh" }}
          />
          <Typography
            variant="body2"
            color="text.secondary"
            mt={2}
            sx={{ fontSize: "2vh" }}
          >
            {comment}
          </Typography>
        </CardContent>
      </Card>
      {/* </Container> */}
    </Grid>
  );
};

export default YourRatingCard;
