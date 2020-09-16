const express = require('express');
const authenticate = require('../../middleware/authenticate');
const catchErrors = require('../../middleware/catcherrors');
const validate = require('../../middleware/validate');
const { validateUser, validateLogin } = require('../../models/user');
const { getUser, newUser, login } = require('../controllers');
const router = express.Router();

router.get(
    "/me",
    authenticate,
    catchErrors(getUser)
)

router.post(
    "/",
    validate(validateUser),
    catchErrors(newUser)
)

router.post(
    "/login",
    validate(validateLogin),
    catchErrors(login)
)

module.exports = router;