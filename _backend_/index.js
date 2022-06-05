
const express = require("express");
const conn = require("./config/db");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const app = express();
dotenv.config();

// Routes
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const eventRoute = require("./routes/event");
const presenceRoute = require("./routes/presence");

//-----------------------middlewares-----------------------

app.use(express.json());
app.use(helmet());
app.use(morgan("common"));


app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/event", eventRoute);
app.use("/api/presence", presenceRoute);

















//-----------------------server-----------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, (err) => {
    conn();
    console.log(`Backend connected! ${PORT}`)
});