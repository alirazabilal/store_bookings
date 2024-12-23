import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Book.css";

const Book = () => {
  const location = useLocation();
  const { property } = location.state || {};

  if (!property) {
    return <div className="error-message">Property not found!</div>;
  }

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const calcTotalPrice = () => {
    if (!checkIn || !checkOut || !guests) return 0;

    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const nightDifference = (checkOutDate - checkInDate) / (1000 * 3600 * 24);

    if (nightDifference < 1) return 0;

    return nightDifference * guests * property.price;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!checkIn || !checkOut || !guests) {
      setError("All fields are required.");
      return;
    }

    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);

    if (checkOutDate <= checkInDate) {
      setError("Check-out date must be after check-in date.");
      return;
    }

    setError("");

    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const bookingData = {
      property: property._id,
      propertyName: property.title,
      checkIn,
      checkOut,
      guests,
    };

    try {
      const response = await axios.post(
        "http://localhost:4000/booking/",
        bookingData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Booking response:", response.data);
      navigate("/");
    } catch (error) {
      console.error("Error submitting booking:", error);
      setError("There was an issue with the booking. Please try again.");
    }
  };

  return (
    <div className="book-container">
      <h2 className="heading">Request to Book</h2>
      <form className="booking-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Check-in Date</label>
          <input
            className="form-input"
            type="date"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Check-out Date</label>
          <input
            className="form-input"
            type="date"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Number of Guests</label>
          <input
            className="form-input"
            type="number"
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            min="1"
            max="100"
            required
          />
        </div>

        {error && <div className="error-message">{error}</div>}

        <button className="submit-button" type="submit">
          Continue
        </button>
      </form>

      <hr />

      <div className="property-summary">
        <h3>Summary of Your Booking</h3>
        <p>
          <strong>Property:</strong> {property.title}
        </p>
        <p>
          <strong>Price per Night:</strong> ${property.price}
        </p>
        <p>
          <strong>Check-in Date:</strong> {checkIn}
        </p>
        <p>
          <strong>Check-out Date:</strong> {checkOut}
        </p>
        <p>
          <strong>Guests:</strong> {guests}
        </p>
        <p>
          <strong>Total Price:</strong> ${calcTotalPrice()}
        </p>
      </div>
    </div>
  );
};

export default Book;
