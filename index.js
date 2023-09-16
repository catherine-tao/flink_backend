const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const signupRoute = require("./routes/signup");
const loginRoute = require("./routes/login");
const promptRoute = require("./routes/prompt");


require("dotenv/config");

mongoose.set("strictQuery", false);

const port = 3000;

mongoose.connect(process.env.DATABASE_URI);

console.log("index")

app.use(cors());

app.use(express.json());

app.use("/signup", signupRoute);
app.use("/login", loginRoute);
app.use("/prompt", promptRoute);

app.listen(port);
