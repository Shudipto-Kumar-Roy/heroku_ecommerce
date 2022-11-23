const express = require("express");
const cookieParser = require("cookie-parser");
const cloudinary = require("cloudinary").v2;
const bodyParser = require("body-parser");
const path = require("path");
const cors = required("cors");
const fileUpload = require("express-fileupload");
const errorMiddleware = require("./middleware/error");
const app = express();
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config();
}
const PORT = process.env.PORT || 4000;

// Database connection
require("./config/database").connectToDatabase();

// Cloudinary connection
cloudinary.config({
  cloud_name: process.env.CLOUDNARY_CLOUD_NAME,
  api_key: process.env.CLOUDNARY_API_KEY,
  api_secret: process.env.CLOUDNARY_API_SECRET_KEY,
});

// middleware
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(cookieParser());
app.use(fileUpload());
app.use(cors());

// Handeling Uncaught Exception
process.on("uncaughtException", (err) => {
  console.log(`Error : ${err.message}`);
  console.log("Sutting down the server due to Uncaught Exception");
  process.exit(1);
});

// route
const productRoute = require("./routers/productRoute");
const userRoute = require("./routers/userRoute");
const orderRoute = require("./routers/orderRoute");
const paymentRoute = require("./routers/paymentRoute");
app.use("/api/v1", productRoute);
app.use("/api/v1", userRoute);
app.use("/api/v1", orderRoute);
app.use("/api/v1", paymentRoute);

// ***********for react site deployment
app.use(express.static(path.join(__dirname, "./client/build/")));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./client/build/index.html"));
});
// *********** end ** for react site deployment

//last middleware for error
app.use(errorMiddleware);

const server = app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Unhandeled Promise rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error : ${err.message}`);
  console.log("Sutting down the server due to Unhandled Promise Rejection");

  server.close(() => {
    process.exit(1);
  });
});
