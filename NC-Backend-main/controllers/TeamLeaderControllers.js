const Member = require("../models/Member");
const Team = require("../models/Team")
const { currentcohort } = require("../variables/cohortes");

async function getAllTeamLeader(req, res) {
  const cohortTl = await Member.find({ 'cohortHistory.teamLeader' : true});
  const selectionTl = await Member.find({ 'selectionHistory.teamLeader' : true});

  console.log(cohortTl)
  console.log(selectionTl)
  const getAllTeamLeaders = [...new Set(cohortTl, selectionTl)]
  console.log(getAllTeamLeaders)

  res.json({ ok: true, getAllTeamLeaders });
}



async function getCohortTeamLeader(req, res) {
  // const cohortTl = await Member.find({ 'cohortHistory.teamLeader' : true});
  // const selectionTl = await Member.find({ 'selectionHistory.teamLeader' : true});

  // console.log(cohortTl)
  // console.log(selectionTl)
  // const getAllTeamLeaders = [...new Set(cohortTl, selectionTl)]
  // console.log(getAllTeamLeaders)

  // res.json({ ok: true, getAllTeamLeaders });
}

// async function getNewMembers(req, res) {
//   const getNewMembers = await Member.find({'cohortHistory': {'$size': 1}, 'cohortHistory.cohort': currentcohort.id});
//   res.json({ ok: true, getNewMembers });
// }

// async function getActualMembers(req, res) {
//   const getActualMembers = await Member.find({ 'cohortHistory.cohort' : currentcohort.id});
//   res.json({ ok: true, getActualMembers });
// }

// const toTitleCase = (phrase) => {
//   return phrase
//     .toLowerCase()
//     .split(' ')
//     .map(word => word.charAt(0).toUpperCase() + word.slice(1))
//     .join(' ');
// }



module.exports = {
  getAllTeamLeader,
  getCohortTeamLeader,
};
