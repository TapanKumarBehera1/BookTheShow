const express = require("express");
const moviesRoute = express.Router();
const multer = require("multer");
const { fetchAllMovies, addANewMovie ,fetchMovieById,editMovieById,deleteMovieById} = require("../controller/movies");
const { verifyToken, verifyAdminToken } = require("../middleware/common");
const upload = require("../config/multer");

moviesRoute.get("/", fetchAllMovies);
moviesRoute.get("/:id", fetchMovieById);
moviesRoute.post("/",verifyAdminToken,upload.single("poster"),addANewMovie
)
moviesRoute.patch("/:id",verifyAdminToken,editMovieById);
moviesRoute.delete("/:id",verifyAdminToken,deleteMovieById);

module.exports = moviesRoute;
