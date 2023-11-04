const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");

dotenv.config();

const app = express();

app.use(cors({ credentials: true, origin: "*" }));
app.use(cookieParser());
app.use(express.json());

// routers

// connect to database

mongoose
  .connect(process.env.MONGOOSE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to db");
    app.listen(process.env.PORT, () => {
      console.log("Sever is running on " + process.env.PORT);
    });
  })
  .catch((err) => console.log(err));
