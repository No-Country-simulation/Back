const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
  member: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Member",
    autopopulate: false,
    unique: true,
  },
  review: [
    {
      instance: { type: String },
      number: { type: Number },
      reviewed: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Member",
        autopopulate: false,
      },
      teamWork: { type: Number },
      comunication: { type: Number },
      proactivity: { type: Number },
      technical: { type: Number },
      kt: { type: Number },
      cordiality: { type: Number },
      leadership: { type: Boolean, default: false },
      inactive: { type: Boolean, default: false },
      feedback: { type: String },
      team: { type: String },
    },
  ],
});
ReviewSchema.plugin(require("mongoose-autopopulate"));
module.exports = mongoose.model("Review", ReviewSchema);
// const mongoose = require("mongoose");

// const ReviewSchema = new mongoose.Schema({
//   member: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Member",
//     autopopulate: false,
//     unique: true,
//   },
//   review: [
//     {
//       instance: { type: String },
//       number: { type: Number },
//       reviewed: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Member",
//         autopopulate: false,
//       },
//       teamWork: { type: Number },
//       comunication: { type: Number },
//       proactivity: { type: Number },
//       technical: { type: Number },
//       kt: { type: Number },
//       cordiality: { type: Number },
//       leadership: { type: Boolean, default: false },
//       feedback: { type: String },
//       team: { type: String },
//     },
//   ],
// });
// ReviewSchema.plugin(require("mongoose-autopopulate"));
// module.exports = mongoose.model("Review", ReviewSchema);
