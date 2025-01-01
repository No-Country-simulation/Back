const router = require("express").Router();
const { check } = require("express-validator");
const { validateFields } = require("../middleware/ValidateFields");
const {
  getAllReview,
  postReview,
} = require("../controllers/ReviewControllers");
const {
  processExcel,
  getReviewFromMails,
  processExcelMember,
} = require("../controllers/ReviewControllersAux");

router.get("/", getAllReview);
router.get("/test", getReviewFromMails);

router.post("/", postReview);

router.post("/test", processExcel);
router.post("/testmember", processExcelMember);
module.exports = router;
