const express = require("express");
const catchErrors = require("../../middleware/catcherrors");
const validate = require("../../middleware/validate");
const validateObjectId = require("../../middleware/validateObjectId");
const { validateGenre } = require("../../models/genres");
const { getAllGenres, getGenre, newGenre, editGenre, deleteGenre, } = require("../contollers");
const router = express.Router();

router.get(
  "/", 
  catchErrors(getAllGenres)
);

router.get(
  "/:Id", 
  validateObjectId, 
  catchErrors(getGenre)
);

router.post(
  "/", 
  validate(validateGenre), 
  catchErrors(newGenre)
);

router.put(
  "/:id",
  validateObjectId,
  validate(validateGenre),
  catchErrors(editGenre)
);

router.delete(
  "/:id",
  validateObjectId,
  catchErrors(deleteGenre)
);

module.exports = router;
