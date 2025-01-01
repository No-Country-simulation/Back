const router = require("express").Router();
const { check } = require("express-validator");
const { validateFields } = require("../middleware/ValidateFields");
const { postLogin } = require("../controllers/AuthControllers");

router.post(
  "/",
  [
    check("username", "El nombre es obligatorio").not().isEmpty(),
    check("username", "El nombre debe ser válido").isString(),
    check("password", "El password es obligatorio").not().isEmpty(),

    validateFields,
  ],
  postLogin
);
module.exports = router;
