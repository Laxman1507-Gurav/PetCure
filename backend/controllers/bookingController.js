const Booking = require('../models/Booking');

// @desc  Create booking
// @route POST /api/bookings
const createBooking = async (req, res) => {
  try {
    const { animalType, breed, petName, contactNumber, clinic, notes } = req.body;

    if (!animalType || !contactNumber) {
      return res.status(400).json({ message: 'Animal type and contact number are required' });
    }

    const booking = await Booking.create({
      user: req.user._id,
      animalType,
      breed,
      petName,
      contactNumber,
      clinic,
      notes,
    });

    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc  Get my bookings
// @route GET /api/bookings/my
const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc  Get all bookings (admin)
// @route GET /api/bookings
const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate('user', 'name email').sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc  Update booking status (admin)
// @route PUT /api/bookings/:id
const updateBookingStatus = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });

    booking.status = req.body.status || booking.status;
    const updated = await booking.save();
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createBooking, getMyBookings, getAllBookings, updateBookingStatus };
