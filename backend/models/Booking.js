const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    animalType: {
      type: String,
      required: [true, 'Animal type is required'],
      enum: ['Dog', 'Cat', 'Bird', 'Rabbit', 'Fish', 'Reptile', 'Other'],
    },
    breed: {
      type: String,
      default: 'Unknown',
    },
    petName: {
      type: String,
      default: '',
    },
    contactNumber: {
      type: String,
      required: [true, 'Contact number is required'],
      match: [/^\d{10}$/, 'Enter a valid 10-digit contact number'],
    },
    clinic: {
      name: { type: String, default: '' },
      lat: { type: Number, default: 0 },
      lng: { type: Number, default: 0 },
    },
    status: {
      type: String,
      enum: ['Pending', 'Confirmed', 'Cancelled', 'Completed'],
      default: 'Pending',
    },
    notes: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Booking', bookingSchema);
