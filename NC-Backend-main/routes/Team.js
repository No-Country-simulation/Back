const router = require("express").Router();
const { check } = require("express-validator");
const { validateFields } = require("../middleware/ValidateFields");
const {
  getAllTeam,
  postTeam,
  putTeam,
  putMemberTeam,
  removeMemberTeam,
  searchTeam,
  putMemberSelectionTeam,
  removeMemberSelectionTeam,
  getActualTeam,
  getActualSelTeam,
  getTeamMembers,
  putTeamLeaderTeam,
  getTeamLeaders,
  putInfo,
  setApproved,
  getActualHackathonTeam,
  removeMemberHackathonTeam,
  putMemberHackathonTeam,
  getActualFullTeam,
  setChannelId,
  getTeamNormalized,
  setMeet,
} = require("../controllers/TeamControllers");
const { verifyTokenAndAdmin } = require("../middleware/verifyToken");

router.get("/", verifyTokenAndAdmin, getAllTeam);
router.get("/normalized", verifyTokenAndAdmin, getTeamNormalized);
router.get("/actual", getActualTeam);
router.get("/actualselection", getActualSelTeam);
router.get("/actualhackathon", getActualHackathonTeam);
router.get("/actualfull", getActualFullTeam);
router.get("/?teamid", getTeamMembers);
router.get("/teamleaders", verifyTokenAndAdmin, getTeamLeaders);

router.post(
  "/",
  [
    check(
      "name",
      "La tecnologia debe ser de tipo cadena de caracteres!"
    ).isString(),

    validateFields,
  ],
  postTeam
);

router.put(
  "/:id",
  verifyTokenAndAdmin,
  [
    check(
      "stack",
      "La tecnologia debe ser de tipo cadena de caracteres!!"
    ).isString(),

    validateFields,
  ],
  putTeam
);
router.put(
  "/asignar/:id",
  verifyTokenAndAdmin,
  [
    // check(
    //   "members",
    //   "La tecnologia debe ser de tipo cadena de caracteres!!!"
    // ).isArray(),

    validateFields,
  ],
  putMemberTeam
);

router.put(
  "/selection/:id",
  verifyTokenAndAdmin,
  [
    // check(
    //   "members",
    //   "La tecnologia debe ser de tipo cadena de caracteres!!!!"
    // ).isArray(),

    validateFields,
  ],
  putMemberSelectionTeam
);
router.put(
  "/removeSelection/:id",
  verifyTokenAndAdmin,
  removeMemberSelectionTeam
);
router.put(
  "/addteamleader/:teamid/:memberid",
  verifyTokenAndAdmin,
  putTeamLeaderTeam
);

router.put(
  "/hackathon/:id",
  verifyTokenAndAdmin,
  [validateFields],
  putMemberHackathonTeam
);
router.put(
  "/removehackathon/:id",
  verifyTokenAndAdmin,
  removeMemberHackathonTeam
);

router.put("/addinfo/:teamid/", verifyTokenAndAdmin, putInfo);

router.put("/remove/:id", verifyTokenAndAdmin, removeMemberTeam);
router.get("/search", verifyTokenAndAdmin, searchTeam);

router.put("/approved/:teamid", verifyTokenAndAdmin, setApproved);
router.put("/channelid/:teamid", verifyTokenAndAdmin, setChannelId);
router.put("/meet/:teamid", verifyTokenAndAdmin, setMeet);

module.exports = router;
