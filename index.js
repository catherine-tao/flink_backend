const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv/config");

mongoose.set("strictQuery", false);

const port = 3000;

mongoose.connect(process.env.DATABASE_URI);

console.log("index")

const singupRoute = require("./routes/signup");

app.use(cors());

app.use(express.json());

app.use("/signup", singupRoute);

app.listen(port);
