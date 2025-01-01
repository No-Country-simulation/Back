require("dotenv").config();
const fs = require("fs");
const dates = require("../variables/dates.json");

async function getDates(req, res) {
  try {
    console.log(dates);
    // const dates = JSON.parse(file);
    if (dates) {
      return res.status(200).json(dates);
    } else {
      return res.status(400).json({ msg: "Not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error al obtener fechas" });
  }
}

module.exports = getDates;
