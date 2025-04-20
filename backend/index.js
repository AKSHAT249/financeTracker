const express =  require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const {connectDB}  = require("./db/conn.js");
const transactionRoute = require("./router/transactionRoute.js");


const app  = express();
const PORT = process.env.PORT;



app.use(cors());
app.use(express.json());
app.use("/api", transactionRoute);

connectDB();

app.listen(PORT,() => {
    console.log(`Server is listening to port ${PORT}`);
} )