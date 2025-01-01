const mongoose = require("mongoose");

const CohortSchema = new mongoose.Schema({
  members: { type: String },
  teams: { type: Number },
  teamleader: { type: Number },
});

module.exports = mongoose.model("Cohort", CohortSchema);
