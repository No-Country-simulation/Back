const User = require("../models/User");

async function getAllUser(req, res) {
  const getUsers = await User.find();
  res.json({ ok: true, getUsers });
}

async function postUser(req, res) {
  const { fullName, email, password, admin } = req.body;
  const newUser = await User.create({
    fullName,
    email,
    password,
    admin,
  });
  res.status(201).json(newUser);
}

//Test
async function putUser(req, res) {
  const userId = req.params.id;

  const user = await User.findById(userId);

  const newUser = {
    ...req.body,
  };
  const userUpdate = await User.findByIdAndUpdate(userId, newUser, {
    new: true,
  });

  res.json({
    ok: true,
    team: userUpdate,
  });
}

module.exports = {
  getAllUser,
  postUser,
  putUser,
};
