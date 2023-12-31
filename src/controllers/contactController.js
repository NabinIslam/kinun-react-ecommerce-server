const Contact = require('../models/contactModel');

const handleCreateContact = async (req, res, next) => {
  try {
    const { name, email, message } = req.body;

    const contact = await Contact.create({ name, email, message });

    if (!contact)
      return res
        .status(404)
        .json({ success: false, message: `Couldn't create contact` });

    return res.status(200).json({
      success: true,
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

    if (!contacts)
      return res
        .status(404)
        .json({ success: false, message: `Couldn't find contacts` });

    return res.status(200).json({
      success: true,
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
