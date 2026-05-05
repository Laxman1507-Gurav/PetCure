const Contact = require('../models/Contact');

// @desc  Submit contact form
// @route POST /api/contact
const submitContact = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const contact = await Contact.create({ name, email, message });
    res.status(201).json({ message: 'Message received! We will get back to you soon.', contact });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc  Get all contacts (admin)
// @route GET /api/contact
const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { submitContact, getContacts };
