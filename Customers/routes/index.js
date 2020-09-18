const express = require("express");
const catchErrors = require("../../middleware/catcherrors");
const validate = require("../../middleware/validate");
const validateObjectId = require("../../middleware/validateObjectId");
const { validateCustomer } = require("../../models/customer");
const {
  getCustomer,
  newCustomer,
  editCustomer,
  deleteCustomer,
} = require("../controllers");
const router = express.Router();

router.get("/", catchErrors(getCustomer));

router.post("/", validate(validateCustomer), catchErrors(newCustomer));

router.put("/:id", catchErrors(validateObjectId), validate(validateCustomer), catchErrors(editCustomer));

router.delete("/:id", catchErrors(validateObjectId), catchErrors(deleteCustomer));

module.exports = router