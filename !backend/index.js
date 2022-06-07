const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const authRoute = require("./routes/auth")
const eventRoute = require("./routes/event")
const userRoute = require("./routes/user")
const passport = require("passport");
const session = require("express-session");
require("./passport");

const mongoose = require("mongoose");
const passportLocal = require("passport-local").Strategy;
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const bodyParser = require("body-parser");

const conn = require("./config/db");

dotenv.config();
const app = express();

// ---------------------- middleware ----------------------------------

app.use(
    session({
        secret: 'secretcode',
        resave: false,
        saveUninitialized: true,
        cookie: { secure: true }
    })
);

app.use(cookieParser());
app.use(passport.initialize(undefined));
app.use(passport.session(undefined));

// cors rules
app.use(cors({
    origin: "https://localhost:3000",
    // methods: "GET, POST, PUT, DELETE",
    credentials: true,

}));

app.use(express.json());

app.use("/auth", authRoute);
app.use("/event", eventRoute);
app.use("/user", userRoute);

// error handler
app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!";

    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack,
    });
});


// ---------------------- end of middleware ----------------------------------


//server
const PORT = process.env.PORT || 5000;
app.listen(PORT, (err) => {
    conn();
    console.log(`Backend connected! ${PORT}`)
});