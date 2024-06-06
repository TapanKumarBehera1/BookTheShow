const mongoose = require("mongoose");
const { Schema } = mongoose;

const bookingSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    movie: { type: Schema.Types.ObjectId, ref: "Movie", required: true },
    seat: { type: Number, required: true },
    bookingDate: { type: String, required: true },
    status: { type: String, required: true, default: "pending" },
  },
  { timestamps: true }
);

const virtual = bookingSchema.virtual("id");
virtual.get(() => {
  return this._id;
});

bookingSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

exports.Booking = mongoose.model("Booking", bookingSchema);
