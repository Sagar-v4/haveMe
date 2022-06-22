
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
const assistantRoute = require("./routes/assistant");

//-----------------------middlewares-----------------------
const cors=require("cors");
const corsOptions ={
    origin:'*',
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
}

app.use(cors(corsOptions))


app.use(express.json());
app.use(helmet());
app.use(morgan("common"));


app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/event", eventRoute);
app.use("/api/presence", presenceRoute);
app.use("/api/assistant", assistantRoute);



//-----------------------server-----------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, (err) => {
    conn();
    console.log(`Backend connected! ${PORT}`)
});