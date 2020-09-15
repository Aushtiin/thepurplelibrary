const mongoose = require("mongoose");
const Joi = require("@hapi/joi");

const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    minlenght: 3,
    maxlength: 200,
    required: true,
  },
});

function validateGenre(genre) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(200).required(),
  });
  return schema.validate(genre);
}

const Genre = mongoose.model('Genre', genreSchema);

module.exports = {
  Genre,
  genreSchema,
  validateGenre
};
