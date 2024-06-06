require("dotenv").config();
const express = require("express");
const server = express();
const path = require("path");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const databaseConnect = require("./config/database");
const moviesRoute = require("./routes/movieRoute");
const authRoute = require("./routes/authRoute");
const bookingRoute = require("./routes/bookingRoute");
databaseConnect().catch((error) => console.log(error));

// server.use(
//   cors({
//     origin: "http://localhost:5173",
//     credentials: true,
//   })
// );

server.use(express.static(path.resolve(__dirname, 'dist')));
server.use(cookieParser());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.use("/auth", authRoute);
server.use("/movie", moviesRoute);
server.use("/booking", bookingRoute);

server.use("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "dist", "index.html"));
});

server.listen(process.env.PORT, () => {
  console.log(`server is running on port ${process.env.PORT}`);
});
