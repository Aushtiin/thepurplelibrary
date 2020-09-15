const mongoose = require("mongoose");
const Joi = require("@hapi/joi");
const { genreSchema } = require("./genres");

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 200,
    trim: true,
  },

  genre: {
    type: genreSchema,
    required: true,
  },

  numberInStock: {
    type: Number,
    required: true,
    min: 0,
  },
});

function validateBook(book) {
  const schema = Joi.object({
    title: Joi.string().min(2).required(),
    genre: Joi.string().min(3).required(),
    numberInStock: Joi.number().min(0).required(),
  });
  return schema.validate(book);
}

const Book = mongoose.model("Book", bookSchema);

module.exports = {
  Book,
  validateBook,
};
