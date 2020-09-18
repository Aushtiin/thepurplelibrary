const mongoose = require("mongoose");
const Joi = require("@hapi/joi");
const { randomBytes, pbkdf2Sync } = require("crypto");
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
  },

  email: {
    type: String,
    unique: true,
    required: true,
    minlength: 5,
    maxlength: 255,
  },

  hash: String,

  salt: String,

  isAdmin: {
      type: Boolean,
      default: false,
  }
});

userSchema.methods.setPassword = function (password) {
    this.salt = randomBytes(16).toString('hex');
    this.hash = pbkdf2Sync(password, this.salt, 100, 64, "sha512").toString('hex');
}

userSchema.methods.verifyPassword = function (password) {
    const hash = pbkdf2Sync(password, this.salt, 100, 64, "sha512").toString("hex");
    return this.hash === hash;
}

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({
        _id: this._id,
        name: this.name,
        email: this.email

    },
    process.env.SECRET
    );
    return token;
}

function validateUser (user) {
    const schema = Joi.object({
        name: Joi.string().min(2).required(),
        email: Joi.string().email().min(5).max(255).required(),
        password: Joi.string().min(8).max(255).required(),
        isAdmin: Joi.boolean()
    });
    return schema.validate(user)
}

function validateLogin (req) {
    const schema = Joi.object({
        email: Joi.string().email().min(5).max(255).required(),
        password: Joi.string().min(8).max(255).required(), 
    })
    return schema.validate(req);
}

const User = mongoose.model('User', userSchema);

module.exports = {
    userSchema,
    User,
    validateUser,
    validateLogin
}