const router = require("express").Router();
const { check } = require("express-validator");
const { validateFields } = require("../middleware/ValidateFields");
const {
  postMail,
  postMailhackathon,
  postMailChallenge,
  postMailTeams,
  postMailBrevo,
} = require("../controllers/MailControllers");

router.post(
  "/",
  [
    check("email", "El mail es obligatorio").not().isEmpty(),
    // check("firstname", "El nombre debe ser válido").not().isEmpty(),

    validateFields,
  ],
  postMail
);

router.post(
  "/hackathon",
  [
    check("email", "El mail es obligatorio").not().isEmpty(),
    // check("firstname", "El nombre debe ser válido").not().isEmpty(),

    validateFields,
  ],
  postMailhackathon
);

router.post(
  "/challenge",
  [
    check("email", "El mail es obligatorio").not().isEmpty(),
    // check("firstname", "El nombre debe ser válido").not().isEmpty(),

    validateFields,
  ],
  postMailChallenge
);

router.post("/teams", postMailTeams);

router.post("/brevo", postMailBrevo);

module.exports = router;
