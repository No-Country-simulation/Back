const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
  members: { type: String },
  state: { type: Boolean },
  teamleader: { type: Boolean, default: false },
});

module.exports = mongoose.model("Project", ProjectSchema);
