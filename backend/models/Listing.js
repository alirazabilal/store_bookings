const mongoose = require("mongoose");

const listingSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true, unique: true },
    title: { type: String, required: true },
    guests: { type: Number, required: true },
    bedrooms: { type: Number, required: true },
    price: { type: Number, required: true },
  },
  { collection: "listing" }
);

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;
