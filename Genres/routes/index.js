const express = require('express');
const catchErrors = require('../../middleware/catcherrors');
const validate = require('../../middleware/validate');
const { getAllGenres } = require('../contollers');
const router = express.Router();

router.get('/',
    catchErrors(getAllGenres)
)

module.exports = router;