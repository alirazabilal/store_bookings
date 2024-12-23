const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  property: {
    type: String,
    required: true,
  },
  propertyName: {
    type: String,
    required: true,
  },
  user: {
    type: String,
    required: false,
  },
  checkIn: {
    type: Date,
    required: true,
  },
  checkOut: {
    type: Date,
    required: true,
  },

  guests: {
    type: Number,
    required: true,
  },
});

const Booking = mongoose.model("Booking", bookingSchema);
module.exports = Booking;
