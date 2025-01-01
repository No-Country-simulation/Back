const mongoose = require("mongoose");

const TeamSchema = new mongoose.Schema({
  name: { type: String },
  project: { type: String },
  stack: { type: String },
  members: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Member", autopopulate: true },
  ],
  teamLeader: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Member",
    autopopulate: false,
  },
  cohort: { type: Number },
  approved: { type: Boolean, default: false },
  video: { type: String },
  repository: { type: String },
  deploy: { type: String },
  figma: { type: String },
  type: { type: String },
  repositoryList: [
    {
      repo: { type: String },
    },
  ],
  meet: { type: String },
  channelId: { type: String },
});
TeamSchema.plugin(require("mongoose-autopopulate"));
module.exports = mongoose.model("Team", TeamSchema);
