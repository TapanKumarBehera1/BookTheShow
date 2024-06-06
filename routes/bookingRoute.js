const express = require("express");
const bookingRoute = express.Router();
const {
  fetchMyMovieBookings,
  bookAMovie,
  fetchAllBookings,
  updateBooking
} = require("../controller/booking");
const { verifyToken, verifyAdminToken } = require("../middleware/common");

bookingRoute
  .get("/own", verifyToken, fetchMyMovieBookings)
  .post("/", verifyToken, bookAMovie)
  .get("/", verifyAdminToken, fetchAllBookings)
  .patch("/:id", verifyToken, updateBooking);
module.exports = bookingRoute;
