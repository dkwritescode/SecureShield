console.log("Loaded server.js from:", __dirname);
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");

const app = express();

connectDB();

app.use(cors({
    // origin: "http://127.0.0.1:3000",
    // methods: ["GET", "POST", "PUT", "DELETE"],
    // credentials: true
}));

app.use(express.json());

app.use("/api/auth", require("./routes/auth"));

app.get("/", (req, res) => {
    res.send("This is the correct backend file");
});

const PORT = 5050;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
