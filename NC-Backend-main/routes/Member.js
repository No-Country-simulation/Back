const router = require("express").Router();
const { check } = require("express-validator");
const { validateFields } = require("../middleware/ValidateFields");
const {
  getAllMember,
  postMember,
  putMember,
  putAssign,
  putMemberDemo,
  getNewMembers,
  getActualMembers,
  putHackathon,
  putHackathonMVP,
  putChallenge,
  putVertical,
  setNumber,
  postForm,
  setStack,
  putScore,
  getActualHackathonMembers,
  removeHackathonMVP,
  getActualFullMembers,
  putSlack,
  putSlackSeleccionado,
  desasignar,
} = require("../controllers/MemberControllers");
const {
  verifyTokenAndAuthorization,
  verifyToken,
  verifyTokenAndAdmin,
} = require("../middleware/verifyToken");

router.get("/", verifyTokenAndAdmin, getAllMember);
router.get("/new/", getNewMembers);
router.get("/actual/", verifyToken, getActualMembers);
router.get("/actualfull/", verifyToken, getActualFullMembers);
router.get("/actualhackathon/", verifyToken, getActualHackathonMembers);

router.post(
  "/",
  [
    check("fullname", "El nombre es obligatorio").not().isEmpty(),
    check("email", "El email es obligatorio").not().isEmpty().isEmail(),
    check("country", "El pais es obligatorio").not().isEmpty().isString(),
    check("github", "El usuario de git es obligatorio").not().isEmpty(),

    validateFields,
  ],
  postMember
);

router.post("/form", postForm);

router.put("/setnumber", verifyTokenAndAdmin, setNumber);
router.put("/desasignar", verifyTokenAndAdmin, desasignar);
router.put("/setstack", verifyTokenAndAdmin, setStack);
router.put("/setscore", verifyTokenAndAdmin, putScore);
router.put("/setslack", verifyTokenAndAdmin, putSlack);
router.put("/setslackseleccionado", verifyTokenAndAdmin, putSlackSeleccionado);

router.put("/hackathon/", putHackathon);
router.put("/hackathonmvp/", putHackathonMVP);
router.put("/hackremove/", removeHackathonMVP);
router.put("/challenge/", putChallenge);
router.put("/setvertical/", verifyTokenAndAdmin, putVertical);

router.put(
  "/:id",
  verifyTokenAndAdmin,
  [
    check("fullname", "El nombre es obligatorio").not().isEmpty(),
    check("email", "El email es obligatorio").not().isEmpty().isEmail(),
    check("country", "El pais es obligatorio").not().isEmpty().isString(),
    check("areas", "El area es obligatoria").not().isEmpty(),
    check("github", "El usuario de git es obligatorio").not().isEmpty(),
    check("availability", "La disponibilidad es obligatoria").not().isEmpty(),
    check("stack", "La tecnologia es obligoria").not().isEmpty(),
    check("language", "El leguaje es obligorio").not().isEmpty(),
    validateFields,
  ],
  putMember
);
router.put("/", putAssign);

router.put("/demo/:id", putMemberDemo);

module.exports = router;
