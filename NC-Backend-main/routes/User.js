const router = require("express").Router();
const { check } = require("express-validator");
const {
  getAllUser,
  postUser,
  putUser,
} = require("../controllers/UsersControllers");
const { validateFields } = require("../middleware/ValidateFields");
const { verifyTokenAndAdmin } = require("../middleware/verifyToken");

router.get("/", verifyTokenAndAdmin, getAllUser);

router.post(
  "/",
  [
    check("username", "El nombre es obligatorio").not().isEmpty(),
    check("username", "El nombre debe ser válido").isString(),
    check("email", "El email es obligatorio").not().isEmpty(),
    check("email", "El email debe ser válido").isEmail(),
    check("password", "El password es obligatorio").not().isEmpty(),

    validateFields,
  ],
  postUser
);

router.put(
  "/:id",
  verifyTokenAndAdmin,
  [
    check("username", "El nombre es obligatorio").not().isEmpty(),
    check("username", "El nombre debe ser válido").isString(),
    check("email", "El email es obligatorio").not().isEmpty(),
    check("email", "El email debe ser válido").isEmail(),
    check("password", "El password es obligatorio").not().isEmpty(),

    validateFields,
  ],
  putUser
);
module.exports = router;
