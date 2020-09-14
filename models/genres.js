const mongoose = require("mongoose");
const Joi = require("@hapi/joi");

const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    minlenght: 3,
    required: true,
  },
});

function validateGenre(req) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });
  return schema.validate(req);
}

const Genre = mongoose.model("Genre", genreSchema);

module.exports = {
  Genre,
  genreSchema,
  validateGenre
};
