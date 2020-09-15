const express = require('express');
const catchErrors = require('../../middleware/catcherrors');
const validate = require('../../middleware/validate');
const validateObjectId = require('../../middleware/validateObjectId');
const { validateBook } = require('../../models/books');
const { getAllBooks, getBook, addBook, editBook, deleteBook } = require('../controllers');
const router = express.Router();

router.get(
    "/",
    catchErrors(getAllBooks)
)

router.get(
    "/:id",
    validateObjectId,
    catchErrors(getBook)
)

router.post(
    "/",
    validate(validateBook),
    catchErrors(addBook)
)

router.put(
    "/:id",
    validateObjectId,
    validate(validateBook),
    catchErrors(editBook)
)

router.delete(
    "/:id",
    validateObjectId,
    catchErrors(deleteBook)
)

module.exports = router;