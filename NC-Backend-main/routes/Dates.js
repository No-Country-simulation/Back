const router = require("express").Router();
const getDates = require("../controllers/DateController.js");
router.get("/", getDates);
module.exports = router;
