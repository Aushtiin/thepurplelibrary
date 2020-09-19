const express = require('express');
const catchErrors = require('../../middleware/catcherrors');
const validate = require('../../middleware/validate');
const { validatePurchase } = require('../../models/purchase');
const { newPurchase } = require('../controllers');
const router = express.Router();

router.post(
    '/',
    validate(validatePurchase),
    catchErrors(newPurchase)
)


module.exports = router;