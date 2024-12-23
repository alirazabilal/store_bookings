const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Listing = require("../models/Listing.js");
const router = express.Router();

const JWT_SECRET = "alirazabilal";

router.get("/", async (req, res) => {
  try {
    const listings = await Listing.find();
    res.status(200).json(listings);
  } catch (error) {
    res.status(400).send("internal error...");
  }
});
router.get("/search", async (req, res) => {
  const query = req.query.query ? req.query.query.toLowerCase() : "";

  try {
    const filteredListings = await Listing.find({
      title: { $regex: query, $options: "i" },
    });
    res.json(filteredListings);
  } catch (error) {
    res.status(500).json({ error: "Failed to search listings" });
  }
});
router.get("/:id", async (req, res) => {
  const lId = parseInt(req.params.id, 10);
  try {
    const listing = await Listing.findById(req.params.id);

    if (listing) {
      res.json(listing);
    } else {
      res.status(404).json({ error: "Listing not found" });
      console.log("issue");
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch listing" });
    console.log("issue");
  }
});

module.exports = router;
