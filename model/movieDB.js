const mongoose = require("mongoose");
const { Schema } = mongoose;

const movieSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  featuring: { type: [String], required: true },
  poster: {
    type: String,
    required: true,
  },
  releaseDate: { type: String, required: true },
});

const virtual = movieSchema.virtual("id");
virtual.get(() => {
  return this._id;
});

movieSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

exports.Movie = mongoose.model("Movie", movieSchema);
