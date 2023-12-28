const express = require('express');
const {
  handleCreateContact,
  handleGetContacts,
} = require('../controllers/contactController');

const contactRouter = express.Router();

contactRouter.post('/', handleCreateContact);
contactRouter.get('/', handleGetContacts);

module.exports = contactRouter;
