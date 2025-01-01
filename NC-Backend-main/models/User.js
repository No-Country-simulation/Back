const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: { type: String },
  email: { type: String, require: true },
  password: { type: String },
  admin: { type: Boolean, default: true },
});

module.exports = mongoose.model("User", UserSchema);
