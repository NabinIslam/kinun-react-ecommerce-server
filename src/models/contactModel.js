const { Schema, model } = require('mongoose');

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Contact name is required'],
    },
    email: {
      type: String,
      required: [true, 'Contact email is required'],
    },
    message: {
      type: String,
      required: [true, 'Contact message is required'],
    },
  },
  { timestamps: true }
);

const Contact = model('Contact', contactSchema);

module.exports = Contact;
