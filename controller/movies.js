const { Movie } = require("../model/movieDB");
const uploadAtCloudinary = require("../config/cloudinary");

const fetchAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find({});
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json("internal server error");
  }
};

const fetchMovieById = async (req, res) => {
  const { id } = req.params;
  try {
    const movie = await Movie.findById(id);
    res.status(200).json(movie);
  } catch (error) {
    res.status(500).json("internal server error");
  }
};
const addANewMovie = async (req, res) => {
  if (!req.file) {
    return res
      .status(400)
      .json({ photo: false, message: "movie poster not available" });
  }
  const { title, description, featuring, releaseDate } = req.body;
  const file = req.file.path;
  try {
    const moviePoster = await uploadAtCloudinary(file);
    const newAddedDoc = await Movie.create({
      title,
      description,
      featuring,
      poster: moviePoster,
      releaseDate,
    });
    res.status(200).json(newAddedDoc);
  } catch (error) {
    res.status(400).json("something went wrong");
  }
};

const editMovieById = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedmovie = await Movie.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(updatedmovie);
  } catch (error) {
    res.status(500).json("internal server error");
  }
};
const deleteMovieById = async (req, res) => {
  const { id } = req.params;
try {
  const deleteMovie = await Movie.deleteOne({_id:id});
  res.status(200).json({ delete: true, deleteMovie });
  } catch (error) {
    res.status(500).json("internal server error");
  }
};

module.exports = {
  fetchAllMovies,
  addANewMovie,
  fetchMovieById,
  editMovieById,
  deleteMovieById,
};
