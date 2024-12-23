const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const authRoutes = require("./routes/authRoutes.js");
const listingRoute = require("./routes/listingRoute.js");
const bookingRoute = require("./routes/bookingRoute.js");
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = 4000;

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("MongoDB connection error:", error));

app.use("/auth", authRoutes);
app.use("/listing", listingRoute);
app.use("/booking", bookingRoute);

app.get("/", (req, res) => {
  res.send("heyyy");
});
app.listen(PORT, () => {
  console.log("connection ok");
});
