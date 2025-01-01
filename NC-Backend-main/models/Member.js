const mongoose = require("mongoose");

const MemberSchema = new mongoose.Schema({
  fullname: { type: String, require: true },
  firstname: { type: String, require: true },
  lastname: { type: String, require: true },
  email: { type: String, require: true, unique: true },
  country: { type: String, require: true },
  state: { type: String },
  city: { type: String },
  github: { type: String, require: true },
  linkedin: { type: String, require: true },
  phone: { type: String },
  age: { type: String },
  from: { type: String },
  cohortHistory: [
    {
      cohort: { type: Number },
      vertical: { type: String },
      language: { type: String },
      area: { type: String },
      stack: { type: String },
      availability: { type: String },
      experience: { type: String },
      assigned: { type: Boolean, default: false },
      teamLeader: { type: Boolean, default: false },
      team: { ref: "Team", type: mongoose.Schema.Types.ObjectId },
      kpis: {
        rates: { type: Number },
        leadership: { type: Array },
        teamPlayer: { type: Array },
        proactivity: { type: Array },
        comunication: { type: Array },
        cordiality: { type: Array },
        commitment: { type: Array },
        commits: { type: Number },
        codeAdd: { type: Number },
        codeDelete: { type: Number },
      },
    },
  ],
  selectionHistory: [
    {
      selection: { type: Number },
      vertical: { type: String },
      language: { type: String },
      area: { type: String },
      stack: { type: String },
      availability: { type: String },
      experience: { type: String },
      assigned: { type: Boolean, default: false },
      teamLeader: { type: Boolean, default: false },
      team: { ref: "Team", type: mongoose.Schema.Types.ObjectId },
      kpis: {
        rates: { type: Number },
        leadership: { type: Array },
        teamPlayer: { type: Array },
        proactivity: { type: Array },
        comunication: { type: Array },
        cordiality: { type: Array },
        commitment: { type: Array },
        commits: { type: Number },
        codeAdd: { type: Number },
        codeDelete: { type: Number },
      },
    },
  ],
  hackathonHistory: [
    {
      hackathon: { type: Number },
      area: { type: String },
      stack: { type: String },
      enterprise: { type: String },
      assigned: { type: Boolean, default: false },
    },
  ],
  assignmentHistory: [
    {
      language: { type: String },
      area: { type: String },
      stack: { type: String },
      client: { type: String },
      startDate: { type: Date },
    },
  ],
  challengeHistory: [
    {
      challenge: { type: Number },
      area: { type: String }, //No code
      stack: { type: String }, //Adalo o Bubble
      enterprise: { type: String },
      active: { type: Boolean, default: false },
      sprints: [
        {
          id: { type: Number },
          present: { type: Boolean, default: false },
        },
      ],
    },
  ],
  hackathonMVPHistory: [
    {
      hackathon: { type: Number },
      vertical: { type: String },
      language: { type: String },
      area: { type: String },
      stack: { type: String },
      availability: { type: String },
      // experience: { type: String },
      assigned: { type: Boolean, default: false },
      teamLeader: { type: Boolean, default: false },
    },
  ],
  filterPassed: { type: Boolean, default: false },
  slack: { type: String },
  slackSeleccionado: { type: String },
  suspended: { type: Boolean, default: false },
  reason: { type: String },
  number: { type: Number },
  score: { type: Number },
});

MemberSchema.plugin(require("mongoose-autopopulate"));

module.exports = mongoose.model("Member", MemberSchema);
