const Review = require("../models/Review");
const Member = require("../models/Member");
const ObjectId = require("mongodb").ObjectId;
const {
  currentcohort,
  currentselection,
  currenthackathon,
} = require("../variables/cohortes");
const readXlsxFile = require("read-excel-file/node");
const dotenv = require("dotenv");
dotenv.config();
const reader = require("xlsx");

async function getAllReview(req, res) {
  let reviewedMembers = [];
  const allReviews = await Review.find();
  console.log("test");
  allReviews.forEach((rev) => {
    rev.review.forEach((r) => {
      reviewedMembers.push(r._id);
    });
  });

  console.log(reviewedMembers.length);
  // res.json({ ok: true, getAllReview });
}

async function postReview(req, res) {
  // const { fullname, firstname, lastname, email, country, github, phone, linkedin, stack, language, area, experience, availability, teamLeader } =
  //   req.body;

  try {
  } catch (error) {
    console.log(error);
  }
}

async function getReviewFromMails(req, res) {
  // const emails = ["juancruzmusso@gmail.com"];
  try {
    // const members = await Member.find({ email: "omarlestradez@gmail.com" });
    // const members = await Member.find({ email: "david.cicconi94@gmail.com" });
    const members = await Member.find({});

    for (const member of members) {
      console.log(member._id);
      let teamWork = 0;
      let comunication = 0;
      let proactivity = 0;
      let technical = 0;
      let kt = 0;
      let cordiality = 0;
      let cant = 0;
      // let leadership = 0

      const reviews = await Review.find({ "review.reviewed": member._id });
      console.log(reviews.length);
      for (const review of reviews) {
        review.review.forEach((r) => {
          if (r.reviewed._id.toString() === member._id.toString()) {
            cant++;
            teamWork += r.teamWork;
            comunication += r.comunication;
            proactivity += r.proactivity;
            technical += r.technical;
            kt += r.kt;
            cordiality += r.cordiality;
          }
        });
      }
      console.log(proactivity + " " + cant);
      teamWork = teamWork / cant;
      comunication = comunication / cant;
      proactivity = proactivity / cant;
      technical = technical / cant;
      kt = kt / cant;
      cordiality = cordiality / cant;

      // console.log(
      //   `${member.fullname} Teamwork: ${teamWork} Comunication: ${comunication} Proactivity: ${proactivity} technical: ${technical} kt: ${kt} cordiality: ${cordiality}`
      // );
    }
    console.log("exit");
  } catch (error) {
    console.log(error);
  }
}
async function processExcel(req, res) {
  const pathCalificaciones =
    "C:/Users/Administrator/Desktop/NC/Calificaciones/Calificaciones.xlsx";

  const file = reader.readFile(pathCalificaciones);
  const sheets = file.SheetNames;
  let dataReviews = [];
  // let members = []
  for (let i = 0; i < sheets.length; i++) {
    const temp = reader.utils.sheet_to_json(file.Sheets[file.SheetNames[i]]);
    temp.forEach((res) => {
      dataReviews.push(res);
    });
  }

  // console.log(dataReviews);
  try {
    let review;
    // const members = await Member.find({ "selectionHistory.selection": 7 });
    // const members = await Member.find({ "cohortHistory.cohort": 10 });
    const members = await Member.find({});
    console.log(members.length);
    console.log(dataReviews.length);
    // return;

    for (let i = 0; i < dataReviews.length; i++) {
      console.log(i);
      // console.log(dataReviews[i]);
      const member = members.find((m) => m.email == dataReviews[i].email);
      const reviewed = members.find(
        (m) => m.email == dataReviews[i].emailcalificado
      );

      if (member && reviewed) {
        const memberReview = await Review.findOne({ member: member._id });

        if (memberReview) {
          const reviewedExist = memberReview.review.find(
            (r) =>
              r.instance == dataReviews[i].cohorte.charAt(0) &&
              r.number == dataReviews[i].cohorte.charAt(1) &&
              r.reviewed == reviewed._id.toString()
            // r.reviewed.toString() == reviewed._id.toString()
            // r.reviewed == reviewed._id
          );
          if (reviewedExist) {
            // console.log("Ya califico");
          } else {
            review = await Review.findByIdAndUpdate(memberReview._id, {
              $addToSet: {
                review: {
                  instance: dataReviews[i].cohorte.charAt(0),
                  number: dataReviews[i].cohorte.charAt(1),
                  reviewed: reviewed._id,
                  teamWork: dataReviews[i].trabajoequipo,
                  comunication: dataReviews[i].comunicacion,
                  proactivity: dataReviews[i].proactividad,
                  technical: dataReviews[i].tecnica,
                  kt: dataReviews[i].kt,
                  cordiality: dataReviews[i].cordialidad,
                  leadership: dataReviews[i].lider,
                  feedback: dataReviews[i].comentario,
                  team: dataReviews[i].equipo,
                },
              },
            });
          }
        } else {
          // console.log("No existe");

          review = await Review.create({
            member: member._id,
            review: {
              instance: dataReviews[i].cohorte.charAt(0),
              number: dataReviews[i].cohorte.charAt(1),
              reviewed: reviewed._id,
              teamWork: dataReviews[i].trabajoequipo,
              comunication: dataReviews[i].comunicacion,
              proactivity: dataReviews[i].proactividad,
              technical: dataReviews[i].tecnica,
              kt: dataReviews[i].kt,
              cordiality: dataReviews[i].cordialidad,
              leadership: dataReviews[i].lider,
              feedback: dataReviews[i].comentario,
              team: dataReviews[i].equipo,
            },
          });

          // return;
        }
      }
    }

    console.log("exit");
  } catch (error) {
    console.log(error);
    res.status(500);
  }
}

async function processExcelMember(req, res) {
  const pathCalificaciones =
    "C:/Users/Administrator/Desktop/NC/Calificaciones/Calificaciones.xlsx";
  console.log("Procesar calificaciones");
  const file = reader.readFile(pathCalificaciones);
  const sheets = file.SheetNames;
  let dataReviews = [];
  // let members = []
  for (let i = 0; i < sheets.length; i++) {
    const temp = reader.utils.sheet_to_json(file.Sheets[file.SheetNames[i]]);
    temp.forEach((res) => {
      dataReviews.push(res);
    });
  }

  console.log(dataReviews.length);

  try {
    let review;
    // const members = await Member.find({ "selectionHistory.selection": 7 });
    // const members = await Member.find({ "cohortHistory.cohort": 10 });
    const members = await Member.find({});
    // return;

    for (let i = 0; i < dataReviews.length; i++) {
      console.log(i);

      const memberReviewedBy = members.find(
        (m) => m.email == dataReviews[i].email
      );
      const reviewed = members.find(
        (m) => m.email == dataReviews[i].emailcalificado
      );

      if (memberReviewedBy && reviewed) {
        const memberReview = await Review.findOne({
          member: reviewed._id,
        });

        if (memberReview) {
          const reviewedExist = memberReview.review.find(
            (r) =>
              r.instance == dataReviews[i].instancia &&
              r.number == dataReviews[i].number &&
              r.reviewedBy.toString() == memberReviewedBy._id.toString()
            // r.reviewed == reviewed._id
          );
          if (reviewedExist) {
            // console.log("Ya califico");
          } else {
            review = await Review.findByIdAndUpdate(memberReview._id, {
              $addToSet: {
                review: {
                  instance: dataReviews[i].instancia,
                  number: dataReviews[i].number,
                  reviewedBy: memberReviewedBy._id,
                  teamWork: dataReviews[i].trabajoequipo,
                  comunication: dataReviews[i].comunicacion,
                  proactivity: dataReviews[i].proactividad,
                  technical: dataReviews[i].tecnica,
                  kt: dataReviews[i].kt,
                  cordiality: dataReviews[i].cordialidad,
                  leadership: dataReviews[i].lider,
                  inactive: false,
                  feedback: dataReviews[i].comentario,
                  team: dataReviews[i].equipo,
                },
              },
            });
          }
        } else {
          review = await Review.create({
            member: reviewed._id,
            review: {
              instance: dataReviews[i].instancia,
              number: dataReviews[i].number,
              reviewedBy: memberReviewedBy._id,
              teamWork: dataReviews[i].trabajoequipo,
              comunication: dataReviews[i].comunicacion,
              proactivity: dataReviews[i].proactividad,
              technical: dataReviews[i].tecnica,
              kt: dataReviews[i].kt,
              cordiality: dataReviews[i].cordialidad,
              leadership: dataReviews[i].lider,
              feedback: dataReviews[i].comentario,
              inactive: false,
              team: dataReviews[i].equipo,
            },
          });

          // return;
        }
      }
    }

    console.log("exit");
  } catch (error) {
    console.log(error);
    res.status(500);
  }
}

module.exports = {
  getAllReview,
  postReview,
  processExcel,
  getReviewFromMails,
  processExcelMember,
};
