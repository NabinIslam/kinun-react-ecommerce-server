const Contact = require('../models/contactModel');

const handleCreateContact = async (req, res, next) => {
  try {
    const { name, email, message } = req.body;

    const contact = await Contact.create({ name, email, message });

    return res.status(200).json({
      message: `Contact created successfully`,
      contact,
    });
  } catch (error) {
    next(error);
  }
};

const handleGetContacts = async (req, res, next) => {
  try {
    const contacts = await Contact.find({});

    return res.status(200).json({
      message: `All contacts fetched successfully`,
      contacts,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  handleCreateContact,
  handleGetContacts,
};
