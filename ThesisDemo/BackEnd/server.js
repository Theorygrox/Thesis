const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
var bodyParser = require('body-parser');


require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;



app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

app.listen(port, () => {
  console.log(`server is running on port: ${port}`);
});

const dataRouter = require("./routes/data");

app.use("/data", dataRouter);

const userRouter = require("./routes/user");

app.use("/user", userRouter);
