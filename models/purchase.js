const mongoose = require("mongoose");
const Joi = require("@hapi/joi");
Joi.objectId = require('joi-objectid')(Joi);

const purchaseSchema = new mongoose.Schema({
  customer: {
    type: new mongoose.Schema({
      name: {
        type: String,
        required: true,
        trim: true,
      },

      phone: {
        type: Number,
        required: true,
      },

      isGold: {
        type: Boolean,
        default: false,
      },
    }),
  },

  book: {
    type: new mongoose.Schema({
      title: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 200,
        trim: true,
      },

      numberInStock: {
        type: Number,
        min: 0,
      },

      price: {
        type: Number,
        min: 0,
      },
    }),
  },

});

function validatePurchase(purchase) {
    const schema = Joi.object({
        customerId : Joi.objectId().required(),
        bookId: Joi.objectId().required()
    })
    return schema.validate(purchase);
}

const Purchase = mongoose.model("Purchase", purchaseSchema);

module.exports = {
    Purchase,
    validatePurchase
}