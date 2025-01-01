const router = require("express").Router();
const {
  getMember,
  getLedteams,
} = require("../controllers/MemberIdControllers");
const { verifyTokenAndAdmin } = require("../middleware/verifyToken");
const { getMemberTeams } = require("../controllers/MemberIdControllers");
const { putMemberSuspended } = require("../controllers/MemberIdControllers");
const { putAssignment } = require("../controllers/MemberIdControllers");

router.get("/", verifyTokenAndAdmin, getMember);
router.get("/teams/", getMemberTeams);
router.get("/ledteams/:id", verifyTokenAndAdmin, getLedteams);
router.put("/suspend/:id", putMemberSuspended);
router.put("/assignment/:id", putAssignment);

module.exports = router;
