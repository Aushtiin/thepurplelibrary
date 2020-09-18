const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },

    phone: {
        type: Number,
        required: true,
    },

    isGold: {
        type: Boolean,
        default: false
    }
});

function validateCustomer(customer) {
    const schema = Joi.object({
      name: Joi.string().min(5).max(50).required(),
      phone: Joi.string().min(5).max(50).required(),
      isGold: Joi.boolean().required()
    });
    return schema.validate(customer);
  };

  const Customer = mongoose.model('Customer', customerSchema);

  module.exports = {
      validateCustomer,
      Customer
  }