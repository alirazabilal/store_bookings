const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");
const Listing = require("../models/Listing");
const User = require("../models/User");
const authMiddleware = require("../middlewares/authMiddleware.js");

router.post("/", authMiddleware, async (req, res) => {
  try {
    const { property, propertyName, checkIn, checkOut, guests } = req.body;
    const userId = req.user.id; // Use req.user.id instead of req.userId

    console.log("User ID from token:", userId);

    // Validate user existence
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Validate listing existence
    const listing = await Listing.findById(property);
    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    // Validate guest capacity
    if (guests > listing.guests) {
      return res
        .status(400)
        .json({ message: `Maximum guest limit is ${listing.guests}` });
    }

    // Validate check-in and check-out dates
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    if (checkOutDate <= checkInDate) {
      return res
        .status(400)
        .json({ message: "Check-out date must be after check-in date" });
    }

    // Create and save booking
    const booking = new Booking({
      property: listing._id,
      propertyName: listing.title,
      user: user._id,
      checkIn: checkInDate,
      checkOut: checkOutDate,
      guests,
    });

    const savedBooking = await booking.save();

    // Add booking reference to user
    user.bookings.push(savedBooking._id);
    await user.save();

    res
      .status(201)
      .json({ message: "Booking created successfully", booking: savedBooking });
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
