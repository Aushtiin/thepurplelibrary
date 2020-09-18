const express = require('express');
const catchErrors = require('../../middleware/catcherrors');
const validate = require('../../middleware/validate');
const validateObjectId = require('../../middleware/validateObjectId');
const { validateBook, validatePost } = require('../../models/books');
const { getAllBooks, getBook, addBook, editBook, deleteBook } = require('../controllers');
const router = express.Router();

router.get(
    "/",
    catchErrors(getAllBooks)
)

router.get(
    "/:id",
    catchErrors(validateObjectId),
    catchErrors(getBook)
)

router.post(
    "/",
    validate(validatePost),
    catchErrors(addBook)
)

router.put(
    "/:id",
    catchErrors(validateObjectId),
    validate(validateBook),
    catchErrors(editBook)
)

router.delete(
    "/:id",
    catchErrors(validateObjectId),
    catchErrors(deleteBook)
)

module.exports = router;