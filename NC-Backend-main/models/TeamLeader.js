const mongoose = require("mongoose");

const TeamLeaderSchema = new mongoose.Schema({
  members: { type: String },
  teams: { type: Array },
  cohort: { type: Number },
});

module.exports = mongoose.model("TeamLeader", TeamLeaderSchema);
