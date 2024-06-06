const { Booking } = require("../model/bookingDB");
const { User } = require("../model/userDB");
const {
  sendMail,
  confirmBookingTemplate,
  cencelledBookingTemplate,
} = require("../services/common");

const fetchMyMovieBookings = async (req, res) => {
  const { id } = req.user;
  try {
    const userBookings = await Booking.find({ user: id })
      .populate({ path: "movie" })
      .sort({ createdAt: -1 });
    res.status(200).json(userBookings);
  } catch (err) {
    res.status(400).json(err);
  }
};

const bookAMovie = async (req, res) => {
  const { id } = req.user;
  const { seat, bookingDate, movie } = req.body;
  try {
    const booking = await Booking.create({
      seat,
      bookingDate,
      movie,
      user: id,
    });
    const bookingData = await Booking.findById(booking._id).populate("movie");
    const user = await User.findOne({ _id: id }, "-password");

    sendMail({
      to: user.email,
      subject: "Movie Booked",
      html: confirmBookingTemplate(bookingData, user),
    });
    res.status(200).json({ message: true, bookingData });
  } catch (err) {
    res.status(400).json(err);
  }
};

const updateBooking = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const doc = await Booking.findByIdAndUpdate(id, { status }, { new: true });
    const updateData = await Booking.findById(doc._id).populate("movie");
    const userId = await updateData.user;
    const findUserEmail = await User.findOne({ _id: userId });
    await sendMail({
      to: findUserEmail.email && findUserEmail.email,
      subject: "Booking Cancelled",
      html: cencelledBookingTemplate(updateData, findUserEmail),
    });
    res.status(200).json(updateData);
  } catch (err) {
    res.status(400).json(err);
  }
};

const fetchAllBookings = async (req, res) => {
  try {
    const movies = await Booking.find({}).populate("movie");
    res.status(200).json(movies);
  } catch (err) {
    res.status(400).json(err);
  }
};

module.exports = {
  fetchMyMovieBookings,
  bookAMovie,
  fetchAllBookings,
  updateBooking,
};
