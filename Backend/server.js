const path = require("path");
require("dotenv").config({
    path: path.join(__dirname, ".env"),
});

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

//MongoDB connection joint
const connectDB = require("./config/db");
connectDB();

const app = express();

app.use(express.json());
app.use(cors({
    origin: [
        'http://localhost:5173',
        'https://blogify-mern-project.vercel.app'
    ],
    credentials: true
}))

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/blogs", require("./routes/blogRoutes"));

app.get("/", (req, res) => {
    res.send("server is running");
});

app.listen(3000, () => {
    console.log("server is runnig on http://localhost:3000/");
});
