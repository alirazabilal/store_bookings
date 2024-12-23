const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String },
  role: { type: String, enum: ["host", "guest"], default: "guest" },
  bookings: [{ type: mongoose.Schema.Types.ObjectId, ref: "Booking" }],
  listings: [{ type: mongoose.Schema.Types.ObjectId, ref: "Listing" }],
});

const User = mongoose.model("User", userSchema);
module.exports = User;
