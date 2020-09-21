const express = require('express');
const catchErrors = require('../../middleware/catcherrors');
const validate = require('../../middleware/validate');
const { validatePurchase } = require('../../models/purchase');
const { newPurchase, getPurchase } = require('../controllers');
const router = express.Router();

router.post(
    '/',
    validate(validatePurchase),
    catchErrors(newPurchase)
)

router.get(
    "/:id",
    catchErrors(getPurchase)
)


module.exports = router;