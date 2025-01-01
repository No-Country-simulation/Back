const Review = require("../models/Review");
const Member = require("../models/Member");
const {
  currentcohort,
  currentselection,
  currenthackathon,
} = require("../variables/cohortes");
const fs = require("fs");

async function getAllReview(req, res) {
  // const getAllReview = await Review.find();
  //MODIFCREACION

  // const getAllMembers = await Member.find({ 'email' : 'omarlestradez@gmail.com'});
  // res.json({ ok: true, getAllReview });

  try {
    let reviewedMembers = [];
    let reviews = [];
    const allReviews = await Review.find();
    const membersAux = allReviews.map((member) => member.member);

    // let uniq = [...new Set(membersAux)];
    // console.log(uniq.length);

    // const members = await Member.find({ email: "omarlestradez@gmail.com" });
    const members = await Member.find({ _id: { $in: membersAux } });

    for (const member of members) {
      let teamWork = 0;
      let comunication = 0;
      let proactivity = 0;
      let technical = 0;
      let kt = 0;
      let cordiality = 0;
      let cant = 0;
      // let leadership = 0

      const reviewFilter = allReviews.filter(
        (review) => review.member.toString() == member._id.toString()
      );

      for (const review of reviewFilter) {
        review.review.forEach((r) => {
          cant++;
          teamWork += r.teamWork;
          comunication += r.comunication;
          proactivity += r.proactivity;
          technical += r.technical;
          kt += r.kt;
          cordiality += r.cordiality;
        });
      }

      teamWork = teamWork / cant;
      comunication = comunication / cant;
      proactivity = proactivity / cant;
      technical = technical / cant;
      kt = kt / cant;
      cordiality = cordiality / cant;

      reviews.push({
        fullname: member.fullname,
        email: member.email,
        emulaciones:
          member.cohortHistory.length + member.selectionHistory.length,
        reviews: cant,
        teamWork,
        comunication: comunication,
        proactivity,
        liderazgo: "As",
        cordiality: cordiality,
        technical: technical,
        kt: kt,
      });
    }

    return res.status(200).json({ reviews });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ ok: false, msg: "Error comuniquese con el administrador" });
  }
}

async function postReview(req, res) {
  // const { fullname, firstname, lastname, email, country, github, phone, linkedin, stack, language, area, experience, availability, teamLeader } =
  //   req.body;
}

async function processExcel(req, res) {}

module.exports = { getAllReview, postReview };
