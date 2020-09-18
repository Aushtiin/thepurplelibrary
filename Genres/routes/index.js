const express = require("express");
const catchErrors = require("../../middleware/catcherrors");
const validate = require("../../middleware/validate");
const admin = require("../../middleware/admin");
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
  catchErrors(validateObjectId), 
  catchErrors(getGenre)
);

router.post(
  "/", 
  validate(validateGenre), 
  catchErrors(newGenre)
);

router.put(
  "/:id",
  catchErrors(validateObjectId),
  validate(validateGenre),
  catchErrors(editGenre)
);

router.delete(
  "/:id",
  catchErrors(validateObjectId),
  catchErrors(admin),
  catchErrors(deleteGenre)
);

module.exports = router;
