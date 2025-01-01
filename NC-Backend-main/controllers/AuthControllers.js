const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

//register

async function getAuth(req, res) {
  try {
    const user = await User.findOne({ username: req.headers.username });

    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.CRYTO_PASS
    );
    const OriginalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
    console.log(
      req.body.username +
        " PASS: " +
        OriginalPassword +
        " ENCRYPT" +
        user.password
    );
    res.json({ ok: true, user });
  } catch (error) {
    console.log(error);
  }
}

async function postRegister(req, res) {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.CRYTO_PASS
    ).toString(),
    admin: req.body.admin,
  });

  try {
    const saveUser = await newUser.save();
    res.status(201).json(saveUser);
  } catch (error) {
    res.status(500).json(error);
  }
}

async function postLogin(req, res) {
  try {
    const user = await User.findOne({ username: req.body.username });
    !user && res.status(401).json("Error de credencial");

    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.CRYTO_PASS
    );
    const OriginalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
    OriginalPassword !== req.body.password &&
      res.status(401).json("Error de credencial");
    const accessToken = jwt.sign(
      {
        id: user._id,
        admin: user.admin,
      },
      process.env.JWT_SEC,
      { expiresIn: "1y" }
    );

    const { password, ...others } = user._doc;

    res.status(200).json({ ...others, accessToken });
  } catch (err) {
    res.status(500).json(err);
  }
}
module.exports = {
  getAuth,
  postRegister,
  postLogin,
};
