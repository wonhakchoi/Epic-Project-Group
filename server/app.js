// var createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors')

const mongoose = require("mongoose");
require("dotenv").config();

// import routes
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const restaurantsRouter = require("./routes/restaurants");
const collectionsRouter = require("./routes/collections");


const ratingsRouter = require("./routes/ratings");
const authRouter = require("./routes/auth");
const mapsRouter = require("./routes/maps_api");
const { generateRestaurants, clearDatabase, generateCauliflowers } = require("./database/utils");

// mongoose setup for cloud cluster
mongoose
    .connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_URL}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("Connected to Easy-Eats Database"));

// User.deleteMany().then(() => console.log("deleted all users"));

// mongoose setup for local database
// mongoose
//     .connect('mongodb://127.0.0.1:27017/easy-eats')
//     .then(() => console.log("Connected to Local Database"))
//     .catch((error) => console.error("MongoDB Connection Error:", error));

// populate db with collection and restaurant data
// clearDatabase()
//     .then(() => {
//         console.log("Database cleared");
//         return generateRestaurants();
//     })
//     .then(() => {
//         console.log("Database populated with restaurants");
//         return generateCauliflowers();
//     })
//     .then(() => {
//         console.log("Database populated with cauliflowers");
//     });

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

// app.use(cors());
// https://stackoverflow.com/questions/19743396/cors-cannot-use-wildcard-in-access-control-allow-origin-when-credentials-flag-i
app.use(cors({credentials: true, origin: "easy-eats-deploy-git-main-imvanwendy.vercel.app"}));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// setup routes
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/restaurants", restaurantsRouter);
app.use("/collections", collectionsRouter);
app.use("/ratings", ratingsRouter);
app.use("/auth", authRouter);
app.use("/maps", mapsRouter);
// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });
//
// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};
//
//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

module.exports = app;
