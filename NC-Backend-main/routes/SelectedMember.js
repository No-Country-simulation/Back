const router = require("express").Router();
const { check } = require("express-validator");
const { validateFields } = require("../middleware/ValidateFields");
const {
  getAllMembers,
  postMember,
  putFilterTrue,
  putFilterFalse,
  putFilter,
  getActualMembers
} = require("../controllers/SelectedMemberControllers");
const {
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../middleware/verifyToken");

router.get("/", verifyTokenAndAdmin, getAllMembers);
router.get("/actual/",  getActualMembers);

router.post(
  "/",
  [
    check("email", "El email es obligatorio").not().isEmpty().isEmail(),

    validateFields,
  ],
  postMember
);

router.put("/filtertotrue", putFilterTrue);

router.put("/filtertofalse", putFilterFalse);

router.put("/filterpassed",
  [
    check("email", "El email es obligatorio").not().isEmpty().isEmail(),
    check("filter", "El filtro es obligatorio").not().isEmpty(),
    validateFields,
  ],
  putFilter);

module.exports = router;
