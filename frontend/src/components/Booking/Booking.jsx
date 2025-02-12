import React, { useState, useContext } from "react";
import "./booking.css";
import { Form, FormGroup, ListGroup, ListGroupItem, Button } from "reactstrap";
import { useNavigate } from "react-router-dom";
import {BASE_URL} from '../../utils/config.js'
import {AuthContext} from "../../context/AuthContext.js";


const Booking = ({ tour, avgRating }) => {
  const { price, reviews,title, } = tour;
  const navigate = useNavigate();
  const {user} =useContext(AuthContext);

//Booking Schema
  const [booking, setBooking] = useState({
    userId: user && user._id,
    userEmail: user && user._email,
    tourName: title,
    fullName: "",
    phone: "",
    guestSize: 1,
    bookAt: "",
  });
  const handleChange = (e) => {
    setBooking((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  const serviceFee = 10;
  const totalAmount =
    Number(price) * Number(booking.guestSize) + Number(serviceFee);

  // Data to Server
  const handleClick = async (e) => {
    e.preventDefault();
    console.log(booking); // Debugging
  
    try {
        if (!user || user === undefined || user === null) {
            alert("Please login to make a booking");
            return;
        }
  
        // Check if all required fields are filled
        if (!booking.fullName || !booking.phone || !booking.bookAt) {
            alert("Please fill in all required fields.");
            return;
        }

        // Validate the booking date (no past dates allowed)
        const today = new Date();
        const selectedDate = new Date(booking.bookAt);

        if (selectedDate < today.setHours(0, 0, 0, 0)) {
            alert("Booking date not available.");
            return;
        }

        // Validate guest size (no negative or zero values)
        if (booking.guestSize <= 0) {
            alert("Guest size must be at least 1.");
            return;
        }

        const res = await fetch(`${BASE_URL}/booking`, {
            method: "post",
            headers: {
                "content-type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(booking),
        });
  
        const result = await res.json();
  
        if (!res.ok) {
            return alert(result.message);
        }
  
        navigate("/thank-you");
    } catch (error) {
        alert(error.message);
    }
};

  
  return (
    <div className="booking">
      {/* Top Section */}
      <div className="booking__top d-flex align-items-center justify-content-between">
        <h3>
          ${price} <span>/per person</span>
        </h3>
        <span className="tour__rating d-flex align-items-center">
          <i className="ri-star-s-fill"></i>
          {avgRating === 0 ? "Not Rated" : avgRating} ({reviews?.length || 0})
        </span>
      </div>

      {/* Booking Form */}
      <div className="booking__form">
        <h5>Information</h5>
        <Form className="booking__info-form">
          <FormGroup>
            <input
              type="text"
              placeholder="Full Name"
              id="fullName"
              required
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <input
              type="number"
              placeholder="Phone"
              id="phone"
              required
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup className="d-flex align-items-center gap-3">
            <input
              type="date"
              id="bookAt"
              required
              onChange={handleChange}
            />
            <input
              type="number"
              placeholder="Guest"
              id="guestSize"
              required
              onChange={handleChange}
            />
          </FormGroup>
        </Form>
      </div>

      {/* Bottom Section */}
      <div className="booking__bottom">
  <ListGroup>
    <ListGroupItem className="border-0 px-0">
      <h5 className="d-flex align-items-center gap-1">
        ${price} <i className="ri-close-line"></i> 1 person
      </h5>
      <span>${price}</span>
    </ListGroupItem>
    <ListGroupItem className="border-0 px-0">
      <h5>Service charge</h5>
      <span>${serviceFee}</span>
    </ListGroupItem>
    <ListGroupItem className="border-0 px-0 total">
      <h5>Total</h5>
      <span>${totalAmount}</span>
    </ListGroupItem>
  </ListGroup>
        <Button
          className="btn primary__btn w-100 mt-4"
          onClick={handleClick}
        >
          Book Now
        </Button>
      </div>
    </div>
  );
};

export default Booking;
