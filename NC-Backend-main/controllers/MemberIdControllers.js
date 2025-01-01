const Member = require("../models/Member");
const Team = require("../models/Team");
const mongoose = require("mongoose");
const { currentselection, currentcohort } = require("../variables/cohortes");
const ObjectId = require("mongodb").ObjectId;

async function getMember(req, res) {
  const { fullname } = req.body;
  console.log("Holiasdasds");
  try {
    const result = await Member.find({ fullname: new RegExp(fullname, "i") });

    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Comuniquese con el administrador",
    });
  }
}

async function putAssignment(req, res) {
  const email = req.body.email;
  const startDate = req.body.startDate;
  const language = req.body.language;
  const area = req.body.area;
  const stack = req.body.stack;
  const client = req.body.client;

  console.log(
    email +
      " " +
      startDate +
      " " +
      language +
      " " +
      area +
      " " +
      stack +
      " " +
      client
  );

  try {
    const existingMember = await Member.findOne({ email: email.toLowerCase() });
    if (existingMember != undefined) {
      await Member.findByIdAndUpdate(
        existingMember._id,
        {
          $addToSet: {
            assignmentHistory: {
              language: language,
              area: area,
              stack: stack,
              client: client,
              startDate: startDate,
            },
          },
        },
        { new: true }
      );
      res.status(201).json({ msg: "Assigment registrada" });
    } else {
      res.status(404).json({ msg: "Miembro no encontrado" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Comuniquese con el administrador",
    });
  }
}

async function putMemberSuspended(req, res) {
  const id = req.params.id;
  const reason = req.body.reason;
  console.log(reason);
  // console.log(id + " " + email + " " + reason)
  try {
    // const existingMember = await Member.findOne({ email: email.toLowerCase() });
    // if (existingMember != undefined) {
    const updatedMember = await Member.findByIdAndUpdate(
      id,
      {
        $set: {
          suspended: true,
          reason: reason,
        },
      },
      { new: true }
    );
    res.status(201).json({ msg: "Miembro suspendido" });
    // } else {
    //   res.status(404).json({msg: "Miembro no encontrado"});
    // }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Comuniquese con el administrador",
    });
  }
}

async function getLedteams(req, res) {
  const id = req.params.id;
  console.log("Equipos liderados " + id);

  try {
    const teams = await Team.find({ teamleader: new ObjectId(id) });
    console.log(teams.length + "asdasd");
    res.json(teams);
  } catch (error) {
    console.log(error);
  }
}

async function getMemberTeams(req, res) {
  const { email } = req.body;
  let name;

  try {
    const mem = await Member.find({ email: "ivanavillalba578@gmail.com" });

    if (mem.filterPassed === true) {
      name = "S" + "4";
    } else {
      name = "/C" + "4/";
    }

    let id = new ObjectId(mem._id);
    let id2 = mem._id;
    console.log(mem);
    console.log(mem._id);
    console.log(id);
    console.log(id2);
    // const memberTeams = await Team.find({  'members' : mem._id })
    const memberTeams = await Team.find({
      members: new ObjectId(mem.ObjectId),
    });
    // const memberTeams = await Team.find({  'members': mem.ObjectId , 'name': new RegExp(name)})
    console.log(memberTeams);
    res.json({ ok: true, memberTeams });
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getMember,
  getMemberTeams,
  putMemberSuspended,
  putAssignment,
  getLedteams,
};
