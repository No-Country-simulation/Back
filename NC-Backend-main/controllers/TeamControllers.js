const Team = require("../models/Team");
const Member = require("../models/Member");
const {
  currentcohort,
  currentselection,
  currenthackathonMVP,
} = require("../variables/cohortes");
const ObjectId = require("mongodb").ObjectId;

async function getAllTeam(req, res) {
  const getAllTeams = await Team.find({});
  //MODIFCREACION
  // const getAllTeams = await Team.find({ name: new RegExp("C22") });
  res.json({ ok: true, getAllTeams });
}

async function getTeamNormalized(req, res) {
  //Obtengo los equipos

  let teams = [];
  let members = [];
  try {
    const cohortTeams = await Team.find({
      name: new RegExp(`C${currentcohort.id}`),
    });
    const selectionTeams = await Team.find({
      name: new RegExp(`S${currentselection.id}`),
    });

    const hackathonTeams = await Team.find({
      name: new RegExp(`H${currenthackathonMVP.id}`),
    });

    console.log(cohortTeams.length + " " + selectionTeams.length);

    cohortTeams.forEach((team) => {
      let members = [];
      let vertical = "";
      team.members.forEach((member) => {
        const encontrado = member.cohortHistory.find(
          (c) => c.cohort == currentcohort.id
        );

        if (encontrado) {
          members.push({
            fullname: member.fullname,
            email: member.email,
            area: encontrado.area,
            slack: member.slack,
            country: member.country,
          });
        }
      });

      if (team.name.includes("code")) {
        vertical = "No Code";
      } else if (team.name.includes("data")) {
        vertical = "Data - BI";
      } else if (team.name.includes("Mobile")) {
        vertical = "Mobile";
      } else {
        vertical = "Web App";
      }

      teams.push({
        instancia: "C",
        numero: currentcohort.id,
        name: team.name,
        channelId: team.channelId,
        meet: team.meet,
        members: members,
        vertical: vertical,
      });
    });

    selectionTeams.forEach((team) => {
      let members = [];
      let vertical = "";

      if (team.name.includes("code")) {
        vertical = "No Code";
      } else if (team.name.includes("data")) {
        vertical = "Data - BI";
      } else if (team.name.includes("Mobile")) {
        vertical = "Mobile";
      } else {
        vertical = "Web App";
      }
      team.members.forEach((member) => {
        const encontrado = member.selectionHistory.find(
          (s) => s.selection == currentselection.id
        );

        if (encontrado) {
          members.push({
            fullname: member.fullname,
            email: member.email,
            area: encontrado.area,
            slack: member.slack,
            country: member.country,
          });
        }
      });

      teams.push({
        instancia: "S",
        numero: currentselection.id,
        name: team.name,
        channelId: team.channelId,
        meet: team.meet,
        members: members,
        vertical: vertical,
      });
    });

    // hackathonTeams.forEach((team) => {
    //   let members = [];
    //   let vertical = "";

    //   if (team.name.includes("code")) {
    //     vertical = "No Code";
    //   } else if (team.name.includes("data")) {
    //     vertical = "Data - BI";
    //   } else if (team.name.includes("Mobile")) {
    //     vertical = "Mobile";
    //   } else {
    //     vertical = "Web App";
    //   }
    //   team.members.forEach((member) => {
    //     const encontrado = member.hackathonMVPHistory.find(
    //       (s) => s.hackathon == currenthackathonMVP.id
    //     );

    //     if (encontrado) {
    //       members.push({
    //         fullname: member.fullname,
    //         email: member.email,
    //         area: encontrado.area,
    //         slack: member.slack,
    //         country: member.country,
    //       });
    //     }
    //   });

    //   teams.push({
    //     instancia: "H",
    //     numero: currenthackathonMVP.id,
    //     name: team.name,
    //     channelId: team.channelId,
    //     meet: team.meet,
    //     members: members,
    //     vertical: vertical,
    //   });
    // });

    if (teams.length > 0) {
      res.json({ ok: true, teams });
    } else {
      res.status(404).json({ ok: false, msg: "Teams not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, msg: "Error al obtener equipos" });
  }
}

async function getActualTeam(req, res) {
  const getActualTeams = await Team.find({
    name: new RegExp(`C${currentcohort.id}`),
  });

  res.json({ ok: true, getActualTeams });
}

async function getActualSelTeam(req, res) {
  const getActualselTeams = await Team.find({
    name: new RegExp(`S${currentselection.id}`),
  });
  res.json({ getActualselTeams });
}

async function getActualFullTeam(req, res) {
  const getActualTeams = await Team.find({
    name: new RegExp(`dsadasdC${currentcohort.id}`),
  });

  const getActualselTeams = await Team.find({
    name: new RegExp(`S${currentselection.id}`),
  });

  const getActualFullTeams = getActualTeams.concat(getActualselTeams);

  // const getActualFullTeams = await Team.find({
  //   name: new RegExp(`H${currenthackathonMVP.id}`),
  // });
  console.log(getActualFullTeams);
  console.log("ACA");
  res.json({ ok: true, getActualFullTeams });
}

async function getActualHackathonTeam(req, res) {
  const getActualHackathonTeams = await Team.find({
    name: new RegExp(`H${currenthackathonMVP.id}`),
  });
  res.json({ getActualHackathonTeams });
}

async function getTeamMembers(req, res) {
  const teamId = req.params.teamid;
  // console.log(req);
  // console.log(teamId);
  const getTeamMembers = await Team.findById(teamId);
  // const getActualselTeams = await Team.find({'name': new RegExp(`S${currentselection.id}`)});
  res.json({ ok: true, getTeamMembers });
}

async function getTeamLeaders(req, res) {
  const getTeamLeaders = await Team.find({ teamLeader: { $exists: true } });
  res.json({ ok: true, getTeamLeaders });
}

// async function getTeam(req, res) {
// const { name } = req.body

// }
// FALTA RUTA GETTEAM

//add info
async function putInfo(req, res) {
  const teamId = req.params.teamid;
  let { repositoryList } = req.body;
  // console.log(teamId, repository);

  try {
    const team = await Team.findById(teamId);
    if (team) {
      const teamUpdate = await Team.findByIdAndUpdate(teamId, {
        $set: {
          repositoryList: repositoryList,
          // video: video,
          // deploy: deploy,
          // figma: figma,
          // type: type,
        },
      });

      res.status(200).json({
        ok: true,
        msg: "Info agregada",
      });
    } else {
      console.log(error);
      res.status(400).json({
        ok: false,
        msg: "Complete los datos OK",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Comuniquese con el administrador",
    });
  }
}

async function putTeamLeaderTeam(req, res) {
  const teamId = req.params.teamid;
  const memberId = req.params.memberid;

  // console.log(teamId, memberId);
  try {
    const member = await Member.findById(memberId);
    const team = await Team.findById(teamId);
    if (member && team) {
      const teamUpdate = await Team.findByIdAndUpdate(teamId, {
        $set: {
          teamLeader: memberId,
        },
      });

      res.status(200).json({
        ok: true,
        msg: "TL agregado",
      });
    } else {
      console.log(error);
      res.status(400).json({
        ok: false,
        msg: "Complete los datos OK",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Comuniquese con el administrador",
    });
  }
}

async function postTeam(req, res) {
  const { name, teamleader, stack, project, members } = req.body;
  try {
    const newTeam = await Team.create({
      name,
      project,
      stack,
      members,
      teamleader,
    });
    res.status(201).json(newTeam);
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Comuniquese con el administrador",
    });
  }
}

async function putTeam(req, res) {
  const teamId = req.params.id;

  const team = await Team.findById(teamId);

  const newTeam = {
    ...req.body,
  };
  const teamUpdate = await Team.findByIdAndUpdate(teamId, newTeam, {
    new: true,
  });

  res.json({
    ok: true,
    team: teamUpdate,
  });
}

async function putMemberTeam(req, res) {
  const teamId = req.params.id;
  // const { selectId } = req.body;
  // console.log("hol");
  try {
    const teamMemberUpdate = await Team.findByIdAndUpdate(
      teamId,
      {
        $addToSet: { members: req.body.members },
      },
      { new: true }
    );

    // //busco el miembro y lo guardo
    const memberAdded = await Member.findById(req.body.members);
    const memberId = memberAdded._id;

    // //busco el cohorte actual y lo guardo
    //MODIFCREACION
    const actualCohort = memberAdded.cohortHistory.filter(
      (c) => c.cohort === currentcohort.id
    );

    //le modificamos el assigned a true
    actualCohort[0].assigned = true;

    // console.log(actualCohort[0]);
    // //elimino el cohorte con el assigned en false
    await Member.findByIdAndUpdate(memberId, {
      $pull: { cohortHistory: { cohort: currentcohort.id } },
    });

    // // //agrego el cohorte con el assigned en true
    await Member.findByIdAndUpdate(
      memberId,
      { $addToSet: { cohortHistory: actualCohort[0] } },
      { new: true }
    );

    res.json({ ok: true, team: teamMemberUpdate });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      ok: false,
      msg: "Comuniquese con el administrador",
    });
  }
}

async function removeMemberTeam(req, res) {
  const teamId = req.params.id;
  const { member } = req.body;

  try {
    const teamMemberUpdate = await Team.findByIdAndUpdate(
      teamId,
      {
        $pull: { members: member },
      },
      { new: true }
    );

    //AQUI LE CAMBIAMOS EL ASSIGNED EN FALSE
    // //busco el miembro y lo guardo
    const memberAdded = await Member.findById(member);
    const memberId = memberAdded._id;

    // //busco el cohorte actual y lo guardo
    const actualCohort = memberAdded.cohortHistory.filter(
      (c) => c.cohort === currentcohort.id
    );

    //le modificamos el assigned a false
    actualCohort[0].assigned = false;

    // console.log("asdasdasd");
    // //elimino el cohorte con el assigned en true
    await Member.findByIdAndUpdate(memberId, {
      $pull: { cohortHistory: { cohort: currentcohort.id } },
    });

    // // //agrego el cohorte con el assigned en false
    await Member.findByIdAndUpdate(
      memberId,
      { $addToSet: { cohortHistory: actualCohort[0] } },
      { new: true }
    );

    res.json({ ok: true, team: teamMemberUpdate });
  } catch (err) {
    res.status(500).json({
      ok: false,
      msg: "Comuniquese con el administrador",
    });
  }
}

async function searchTeam(req, res) {
  const { name } = req.body;
  try {
    const nameTeams = await Team.find({ name: new RegExp(name, "i") });
    res.status(200).json(nameTeams);
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Comuniquese con el administrador",
    });
  }
}

//SELECTION TEAM

async function putMemberSelectionTeam(req, res) {
  const teamId = req.params.id;
  // const { selectId } = req.body;
  // console.log(teamId);
  try {
    const teamMemberUpdate = await Team.findByIdAndUpdate(
      teamId,
      {
        $addToSet: { members: req.body.members },
      },
      { new: true }
    );

    // //busco el miembro y lo guardo
    const memberAdded = await Member.findById(req.body.members);
    const memberId = memberAdded._id;

    // //busco el seleccionado actual y lo guardo
    const actualSelection = memberAdded.selectionHistory.filter(
      (s) => s.selection === currentselection.id
    );

    //le modificamos el assigned a true
    actualSelection[0].assigned = true;

    // //elimino el que tiene assigned en false
    await Member.findByIdAndUpdate(memberId, {
      $pull: { selectionHistory: { selection: currentselection.id } },
    });

    // // //agrego el que tiene assigned en true
    await Member.findByIdAndUpdate(
      memberId,
      { $addToSet: { selectionHistory: actualSelection[0] } },
      { new: true }
    );

    res.json({ ok: true, team: teamMemberUpdate });
  } catch (err) {
    res.status(500).json({
      ok: false,
      msg: "Comuniquese con el administrador (Selection)",
    });
  }
}

async function removeMemberSelectionTeam(req, res) {
  const teamId = req.params.id;
  const { member } = req.body;

  try {
    const teamMemberUpdate = await Team.findByIdAndUpdate(
      teamId,
      {
        $pull: { members: member },
      },
      { new: true }
    );

    //AQUI LE CAMBIAMOS EL ASSIGNED EN FALSE
    // //busco el miembro y lo guardo
    const memberAdded = await Member.findById(member);
    const memberId = memberAdded._id;

    // //busco el selection actual y lo guardo
    const actualSelection = memberAdded.selectionHistory.filter(
      (s) => s.selection === currentselection.id
    );

    //le modificamos el assigned a false
    actualSelection[0].assigned = false;

    // console.log(actualSelection[0]);

    // //elimino el selection con el assigned en true
    await Member.findByIdAndUpdate(memberId, {
      $pull: { selectionHistory: { selection: currentselection.id } },
    });

    // // //agrego el selection con el assigned en false
    await Member.findByIdAndUpdate(
      memberId,
      { $addToSet: { selectionHistory: actualSelection[0] } },
      { new: true }
    );

    res.json({ ok: true, team: teamMemberUpdate });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      ok: false,
      msg: "Comuniquese con el administrador",
    });
  }
}

async function putMemberHackathonTeam(req, res) {
  const teamId = req.params.id;
  // const { selectId } = req.body;
  // console.log(teamId);
  try {
    const teamMemberUpdate = await Team.findByIdAndUpdate(
      teamId,
      {
        $addToSet: { members: req.body.members },
      },
      { new: true }
    );

    // //busco el miembro y lo guardo
    const memberAdded = await Member.findById(req.body.members);
    const memberId = memberAdded._id;

    // //busco el seleccionado actual y lo guardo
    const actual = memberAdded.hackathonMVPHistory.filter(
      (s) => s.hackathon === currenthackathonMVP.id
    );

    //le modificamos el assigned a true
    actual[0].assigned = true;

    // //elimino el que tiene assigned en false
    await Member.findByIdAndUpdate(memberId, {
      $pull: { hackathonMVPHistory: { hackathon: currenthackathonMVP.id } },
    });

    // // //agrego el que tiene assigned en true
    await Member.findByIdAndUpdate(
      memberId,
      { $addToSet: { hackathonMVPHistory: actual[0] } },
      { new: true }
    );

    res.json({ ok: true, team: teamMemberUpdate });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      ok: false,
      msg: "Comuniquese con el administrador (Hackathon)",
    });
  }
}

async function removeMemberHackathonTeam(req, res) {
  const teamId = req.params.id;
  const { member } = req.body;

  try {
    const teamMemberUpdate = await Team.findByIdAndUpdate(
      teamId,
      {
        $pull: { members: member },
      },
      { new: true }
    );

    //AQUI LE CAMBIAMOS EL ASSIGNED EN FALSE
    // //busco el miembro y lo guardo
    const memberAdded = await Member.findById(member);
    const memberId = memberAdded._id;

    // //busco el selection actual y lo guardo
    const actualSelection = memberAdded.hackathonMVPHistory.filter(
      (s) => s.hackathon === currenthackathonMVP.id
    );

    //le modificamos el assigned a false
    actualSelection[0].assigned = false;

    // console.log(actualSelection[0]);

    // //elimino el selection con el assigned en true
    await Member.findByIdAndUpdate(memberId, {
      $pull: { hackathonMVPHistory: { hackathon: currenthackathonMVP.id } },
    });

    // // //agrego el selection con el assigned en false
    await Member.findByIdAndUpdate(
      memberId,
      { $addToSet: { hackathonMVPHistory: actualSelection[0] } },
      { new: true }
    );

    res.json({ ok: true, team: teamMemberUpdate });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      ok: false,
      msg: "Comuniquese con el administrador",
    });
  }
}

async function setApproved(req, res) {
  console.log("setApprov");
  const teamName = req.params.teamid;
  const { approved } = req.body;
  console.log(teamName);
  console.log(approved);
  try {
    const team = await Team.findOne({ name: teamName });
    if (team) {
      team.approved = approved;
      await team.save();
      res.json({
        ok: true,
        team: team,
      });
    } else {
      res.status(404).json({
        ok: false,
        msg: "No se encontró el equipo",
      });
    }
  } catch (error) {
    console.log(err);
    res.status(500).json({
      ok: false,
      msg: "Comuniquese con el administrador",
    });
  }
}

async function setChannelId(req, res) {
  console.log("Set channel");
  const teamName = req.params.teamid;
  const { channelId } = req.body;
  console.log(teamName);
  console.log(channelId);
  try {
    const team = await Team.findOne({ name: teamName });
    if (team) {
      team.channelId = channelId;
      await team.save();
      res.json({
        ok: true,
        team: team,
      });
    } else {
      res.status(404).json({
        ok: false,
        msg: "No se encontró el equipo",
      });
    }
  } catch (error) {
    console.log(err);
    res.status(500).json({
      ok: false,
      msg: "Comuniquese con el administrador",
    });
  }
}

async function setMeet(req, res) {
  console.log("Set Meet");
  const teamName = req.params.teamid;
  const { meet } = req.body;
  console.log(teamName);
  console.log(meet);
  try {
    const team = await Team.findOne({ name: teamName });
    if (team) {
      team.meet = meet;
      await team.save();
      res.json({
        ok: true,
        team: team,
      });
    } else {
      res.status(404).json({
        ok: false,
        msg: "No se encontró el equipo",
      });
    }
  } catch (error) {
    console.log(err);
    res.status(500).json({
      ok: false,
      msg: "Comuniquese con el administrador",
    });
  }
}

module.exports = {
  getAllTeam,
  postTeam,
  putTeam,
  putMemberTeam,
  removeMemberTeam,
  searchTeam,
  putMemberSelectionTeam,
  removeMemberSelectionTeam,
  getActualTeam,
  getActualSelTeam,
  getTeamMembers,
  putTeamLeaderTeam,
  getTeamLeaders,
  putInfo,
  setApproved,
  getActualHackathonTeam,
  putMemberHackathonTeam,
  removeMemberHackathonTeam,
  getActualFullTeam,
  setChannelId,
  getTeamNormalized,
  setMeet,
};
