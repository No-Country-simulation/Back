const Member = require("../models/Member");
const axios = require("axios");
const {
  currentcohort,
  currentselection,
  currenthackathon,
  currentchallenge,
  currenthackathonMVP,
} = require("../variables/cohortes");

async function getAllMember(req, res) {
  const getAllMembers = await Member.find();
  //MODIFCREACION

  // const getAllMembers = await Member.find({ 'email' : 'enzoriver@outlook.com'});
  res.json({ ok: true, getAllMembers });
}

async function getNewMembers(req, res) {
  const getNewMembers = await Member.find({
    cohortHistory: { $size: 1 },
    "cohortHistory.cohort": currentcohort.id,
  });
  res.json({ ok: true, getNewMembers });
}

async function getActualMembers(req, res) {
  const getActualMembers = await Member.find({
    "cohortHistory.cohort": currentcohort.id,
  });

  res.json({ ok: true, getActualMembers });
}

async function getActualFullMembers(req, res) {
  const getActualMembers = await Member.find({
    "cohortHistory.cohort": currentcohort.id,
  });

  const getActualSelMembers = await Member.find({
    filterPassed: true,
    "selectionHistory.selection": currentselection.id,
  });

  const getActualFullMembers = getActualMembers.concat(getActualSelMembers);

  res.json({ ok: true, getActualFullMembers });
}

async function getActualHackathonMembers(req, res) {
  const getActualHackathonMembers = await Member.find({
    "hackathonMVPHistory.hackathon": currenthackathonMVP.id,
  });

  res.json({
    ok: true,
    total: getActualHackathonMembers.length,
    getActualHackathonMembers,
  });
}

const toTitleCase = (phrase) => {
  return phrase
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

async function postMember(req, res) {
  const {
    fullname,
    firstname,
    lastname,
    email,
    country,
    github,
    phone,
    linkedin,
    age,
    from,
    vertical,
    stack,
    language,
    area,
    experience,
    availability,
    teamLeader,
  } = req.body;

  let emailLow = email.toLowerCase();
  let firstnamePascal = toTitleCase(firstname);
  let lastnamePascal = toTitleCase(lastname);
  let fullnamePascal = firstnamePascal + " " + lastnamePascal;

  //Prueba
  try {
    //SI EXISTE AGREGAR DATOS DE COHORTE AL MIEMBRO

    const existingMember = await Member.findOne({ email: emailLow });

    if (existingMember) {
      console.log(existingMember.filterPassed);
      if (existingMember.filterPassed === true) {
        return res.status(500).json({
          ok: false,
          msg: "El miembro pertenece al seleccionado",
        });
      }

      const anotado = existingMember.cohortHistory.find(
        (c) => c.cohort == currentcohort.id
      );

      if (anotado != undefined) {
        return res.status(500).json({
          ok: false,
          msg: "El email ingresado ya esta inscripto",
        });
      }

      let updatedMember = await Member.findByIdAndUpdate(existingMember._id, {
        $set: {
          fullname,
          firstname,
          lastname,
          from,
        },
      });

      updatedMember = await Member.findByIdAndUpdate(
        existingMember._id,
        {
          $addToSet: {
            cohortHistory: {
              cohort: currentcohort.id,
              vertical,
              area,
              stack,
              language,
              experience,
              teamLeader,
              availability,
            },
          },
        },
        { new: true }
      );
      console.log("as213123");
      res.status(201).json({
        ok: true,
        updatedMember: updatedMember,
        currentcohort: currentcohort,
      });
    }

    //SI NO EXISTE CREAR NUEVO MIEMBRO
    if (!existingMember) {
      const newMember = await Member.create({
        fullname: fullnamePascal,
        firstname: firstnamePascal,
        lastname: lastnamePascal,
        email: emailLow,
        country,
        github,
        linkedin,
        age,
        from,
        phone,
        cohortHistory: {
          cohort: currentcohort.id,
          vertical,
          area,
          stack,
          experience,
          language,
          teamLeader,
          availability,
        },
        filterPassed: false,
      });
      res.status(201).json({
        ok: true,
        newMember: newMember,
        currentcohort: currentcohort,
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

async function putVertical(req, res) {
  try {
    const members = await Member.find();
    for (i = 0; i < members.length; i++) {
      let flag = false;
      const member = members[i];
      console.log("N° ", i, " ", member.email);
      member.cohortHistory.forEach((c) => {
        // // cOHORTE web app
        //   if (c.area == 'Full-Stack' ||
        //   c.area == 'Front-end' || c.area == 'Front-End' ||
        //   c.area == 'Back-End' || c.area == 'Back-end' ||
        //   c.area == 'Design' ||
        //   c.area == 'Tester' ||
        //   c.area == 'DevOps') {

        //       c.vertical = "Web App"

        // //Mobile pero no no code
        //   } else if (c.area == 'Mobile' && c.language != "No Code") {

        //   c.vertical = "Web App"

        // } else {

        // }

        if (c.stack.startsWith("Bubble")) {
          c.vertical = "No Code";
          flag = true;
        }
      });

      member.selectionHistory.forEach((c) => {
        // cOHORTE web app
        // if (c.area == 'Full-Stack' ||
        //     c.area == 'Front-end' || c.area == 'Front-End' ||
        //     c.area == 'Back-End' || c.area == 'Back-end' ||
        //     c.area == 'Design' ||
        //     c.area == 'Tester' ||
        //     c.area == 'DevOps') {

        //       c.vertical = "Web App"

        // //Mobile pero no no code
        //   } else if (c.area == 'Mobile' && c.language != "No Code") {

        //   c.vertical = "Web App"

        // } else {

        // }
        if (c.stack.startsWith("Bubble")) {
          c.vertical = "No Code";
          flag = true;
        }
      });

      if (flag) {
        const updated = await Member.findByIdAndUpdate(member._id, member, {
          new: true,
        });
      }

      // console.log(updated)
    }

    res.status(200).json({
      ok: false,
      msg: "Actualizacion OK",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Comuniquese con el administrador",
    });
  }
}

async function putMember(req, res) {
  const memberId = req.params.id;

  try {
    const member = await Member.findById(memberId);

    if (!member) {
      return res.status(404).json({
        ok: false,
        msg: "Miembro no existe por el id",
      });
    }

    const newmeber = {
      ...req.body,
    };

    const memberUpdate = await Member.findByIdAndUpdate(memberId, newmeber, {
      new: true,
    });

    res.json({
      ok: true,
      member: memberUpdate,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Comuniquese con el administrador",
    });
  }
}

async function putMemberDemo(req, res) {
  const memberId = req.params.id;
  const {
    cohort,
    area,
    language,
    stack,
    availability,
    experience,
    assigned,
    teamLeader,
    team,
    kpis,
  } = req.body;

  const memberUpdate = await Member.findByIdAndUpdate(memberId, {
    cohortHistory: {
      cohort,
      area,
      language,
      stack,
      availability,
      experience,
      assigned,
      teamLeader,
      team,
      kpis,
    },
  });

  res.json({ ok: true, member: memberUpdate });
}

async function putAssign(req, res) {
  const { selectId, cohort } = req.body;
  //necesitamos id member y numero de cohorte

  try {
    // const assing = await Member.find({ _id: { $in: selectId } });

    // const infoMember = Member.findById(selectId);

    // let rightCohort = infoMember.cohortHistory.filter((c) => c.cohort = cohort)

    // console.log(rightCohort)

    const updatedMember = Member.findByIdAndUpdate(
      selectId,

      {
        $set: {
          "cohortHistory.$.assigned": "true",
        },
      }
    );

    // const newTeam = {
    //   ...req.body,
    //   assigned: true,
    // };
    // assing.forEach(async (element) => {
    //   await Member.findByIdAndUpdate(element, newTeam, {
    //     new: true,
    //   });
    // });
    res.status(200).json(updatedMember);
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Comuniquese con el administrador",
    });
  }
}

async function putHackathon(req, res) {
  let { fullname, firstname, lastname, email, country, state, city } = req.body;

  let firstnamePascal = toTitleCase(firstname);
  let lastnamePascal = toTitleCase(lastname);
  let cityPascal = toTitleCase(city);
  let statePascal = toTitleCase(state);
  let fullnamePascal = firstnamePascal + " " + lastnamePascal;

  email = email.toLowerCase();

  try {
    const existingMember = await Member.findOne({ email: email });

    if (existingMember) {
      if (existingMember.hackathonHistory.length > 0) {
        const anotado = existingMember.hackathonHistory.find(
          (h) => h.hackathon == currenthackathon.id
        );

        if (anotado != undefined) {
          return res.status(500).json({
            ok: false,
            msg: "El email ingresado ya esta inscripto",
          });
        }
      } else {
        //Validar si cumple o no
        // let active = existingMember.cohortHistory.find(c => c.cohort == currentcohort.id)

        // if (active != undefined || existingMember.filterPassed == true) {
        if (existingMember) {
          let updatedMember = await Member.findByIdAndUpdate(
            existingMember._id,
            {
              $set: {
                fullname: fullnamePascal,
                firstname: firstnamePascal,
                lastname: lastnamePascal,
                country,
                state: statePascal,
                city: cityPascal,
              },
            }
          );

          updatedMember = await Member.findByIdAndUpdate(
            existingMember._id,
            {
              $addToSet: {
                hackathonHistory: {
                  hackathon: currenthackathon.id,
                  area: currenthackathon.area,
                  stack: currenthackathon.stack,
                  enterprise: currenthackathon.enterprise,
                  assigned: false,
                },
              },
            },
            { new: true }
          );

          return res.status(200).json({
            ok: true,
            msg: "Inscripcion exitosa",
          });
        } else {
          return res.status(500).json({
            ok: false,
            msg: "El email ingresado no corresponde a un miembro activo. Por favor comuniquese con un administrador",
          });
        }
      }
    } else {
      return res.status(500).json({
        ok: false,
        msg: "Usuario no registrado en No Country. Comuniquese con el administrador",
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

async function putChallenge(req, res) {
  let { fullname, firstname, lastname, email, country, state, city } = req.body;

  let firstnamePascal = toTitleCase(firstname);
  let lastnamePascal = toTitleCase(lastname);
  let cityPascal = toTitleCase(city);
  let statePascal = toTitleCase(state);
  let fullnamePascal = firstnamePascal + " " + lastnamePascal;

  email = email.toLowerCase();

  try {
    let filter = false;
    const existingMember = await Member.findOne({ email: email });

    // if (existingMember && existingMember.filterPassed == false) {    //si existe pero no es seleccionado

    //   return res.status(500).json({
    //     ok: false,
    //      msg: "El email ingresado no corresponde al Seleccionado de No Country",
    //   });

    // if (existingMember && existingMember.filterPassed == true) {  // si existe y es seleccionado
    if (existingMember) {
      // si existe y es seleccionado

      const anotado = existingMember.challengeHistory.find(
        (c) => c.challenge == currentchallenge.id
      );
      if (anotado) {
        return res.status(500).json({
          ok: false,
          msg: "El usuario ya se encuentra registrado",
        });
      } else {
        let updatedMember = await Member.findByIdAndUpdate(existingMember._id, {
          $set: {
            fullname: fullnamePascal,
            firstname: firstnamePascal,
            lastname: lastnamePascal,
            country,
            state: statePascal,
            city: cityPascal,
          },
        });

        updatedMember = await Member.findByIdAndUpdate(
          existingMember._id,
          {
            $addToSet: {
              challengeHistory: {
                challenge: currentchallenge.id,
                area: currentchallenge.area,
                stack: currentchallenge.stack,
                enterprise: currentchallenge.enterprise,
                // assigned: false
              },
            },
          },
          { new: true }
        );

        return res.status(200).json({
          ok: true,
          msg: "Inscripcion exitosa",
        });
      }
    } else if (!existingMember) {
      return res.status(500).json({
        ok: false,
        msg: "Usuario no registrado en No Country. Comuniquese con el administrador",
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

async function putHackathonMVP(req, res) {
  let {
    firstname,
    lastname,
    email,
    area,
    language,
    stack,
    availability,
    vertical,
  } = req.body;

  let firstnamePascal = toTitleCase(firstname);
  let lastnamePascal = toTitleCase(lastname);
  let fullnamePascal = firstnamePascal + " " + lastnamePascal;
  emailLow = email.toLowerCase();

  try {
    console.log(`Ingresando Hackathon de ${emailLow} `);
    const existingMember = await Member.findOne({ email: emailLow });
    let anotado = null;
    if (existingMember) {
      if (existingMember.hackathonMVPHistory.length > 0) {
        anotado = existingMember.hackathonMVPHistory.find((h) => {
          return h.hackathon == currenthackathonMVP.id; // o === si estás seguro que son del mismo tipo
        });
      }

      if (anotado != null) {
        console.log(`${emailLow} ya anotado al hackathon`);
        console.log("111111111");
        return res.status(201).json({
          ok: false,
          msg: "El usuario ya se encuentra registrado",
        });
      } else {
        //Lo anoto
        let updatedMember = await Member.findByIdAndUpdate(existingMember._id, {
          $set: {
            fullname: fullnamePascal,
            firstname: firstnamePascal,
            lastname: lastnamePascal,
            email: emailLow,
          },
        });

        //agrego hackathon
        updatedMember = await Member.findByIdAndUpdate(
          existingMember._id,
          {
            $addToSet: {
              hackathonMVPHistory: {
                hackathon: currenthackathonMVP.id,
                vertical: vertical,
                area: area,
                stack: stack,
                // experience: form.experience,
                language: language,
                // teamLeader: teamLeader,
                availability: availability,
              },
            },
          }
          // { new: true }
        );
        console.log("exito");
        return res.status(200).json({
          ok: true,
          msg: "Inscripcion exitosa",
        });
      }
    } else {
      return res.status(400).json({
        ok: false,
        msg: "Usuario no registrado en No Country. Comuniquese con el administrador",
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

async function postForm(req, res) {
  const form = req.body.member;
  let emailLow = form.email.toLowerCase();
  let firstnamePascal = toTitleCase(form.firstname);
  let lastnamePascal = toTitleCase(form.lastname);
  let fullnamePascal = firstnamePascal + " " + lastnamePascal;
  let filter = false;
  console.log(form.stack);
  try {
    console.log(emailLow);
    const existingMember = await Member.findOne({ email: emailLow });

    // SI NO EXISTE CREAR UN COHORTE NUEVO
    if (!existingMember) {
      const newMember = await Member.create({
        fullname: fullnamePascal,
        firstname: firstnamePascal,
        lastname: lastnamePascal,
        email: emailLow,
        country: form.country,
        github: form.github,
        linkedin: form.linkedin,
        age: form.age,
        from: form.from,
        phone: form.phone,
        cohortHistory: {
          cohort: currentcohort.id,
          vertical: form.vertical,
          area: form.area,
          stack: form.stack,
          experience: form.experience,
          language: form.language,
          teamLeader: form.teamLeader,
          availability: form.availability,
        },
        filterPassed: false,
      });
      console.log("Cohort OK");
      // res.status(201).json({
      //   ok: true,
      //   newMember: newMember,
      //   currentcohort: currentcohort,
      // });
    }

    //Si existe verificar
    if (existingMember) {
      // Si NO es seleccionado
      if (existingMember.filterPassed === true) {
        filter = true;
        const anotado = existingMember.selectionHistory.find(
          (s) => s.selection == currentselection.id
        );

        if (anotado != undefined) {
          console.log("El email ingresado ya esta inscripto");
          return res.status(200).json({
            ok: false,
            msg: "El email ingresado ya esta inscripto",
          });
        }

        if (existingMember.filterPassed === true) {
          let updatedMember = await Member.findByIdAndUpdate(
            existingMember._id,
            {
              $set: {
                fullname: fullnamePascal,
                firstname: firstnamePascal,
                lastname: lastnamePascal,
                email: emailLow,
                country: form.country,
                github: form.github,
                linkedin: form.linkedin,
                age: form.age,
                from: form.from,
                phone: form.phone,
              },
            }
          );
          filter = true;
          updatedMember = await Member.findByIdAndUpdate(
            existingMember._id,
            {
              $addToSet: {
                selectionHistory: {
                  selection: currentselection.id,
                  vertical: form.vertical,
                  area: form.area,
                  stack: form.stack,
                  experience: form.experience,
                  language: form.language,
                  teamLeader: form.teamLeader,
                  availability: form.availability,
                },
              },
            },
            { new: true }
          );
        }
      } else {
        //Si no es seleccionado
        filter = false;
        const anotado = existingMember.cohortHistory.find(
          (c) => c.cohort == currentcohort.id
        );

        if (anotado != undefined) {
          console.log("El email ingresado ya esta inscripto");
          return res.status(200).json({
            ok: false,
            msg: "El email ingresado ya esta inscripto",
          });
        }

        let updatedMember = await Member.findByIdAndUpdate(existingMember._id, {
          $set: {
            fullname: fullnamePascal,
            firstname: firstnamePascal,
            lastname: lastnamePascal,
            email: emailLow,
            country: form.country,
            github: form.github,
            linkedin: form.linkedin,
            age: form.age,
            from: form.from,
            phone: form.phone,
          },
        });

        updatedMember = await Member.findByIdAndUpdate(
          existingMember._id,
          {
            $addToSet: {
              cohortHistory: {
                cohort: currentcohort.id,
                vertical: form.vertical,
                area: form.area,
                stack: form.stack,
                experience: form.experience,
                language: form.language,
                teamLeader: form.teamLeader,
                availability: form.availability,
              },
            },
          },
          { new: true }
        );
      }
    }

    axios.post("https://nocountryback.herokuapp.com/api/mail", {
      email: emailLow,
      firstname: firstnamePascal,
      filterPassed: filter,
      vertical: form.vertical,
      area: form.area,
      stack: form.stack,
      experience: form.experience,
      // headers: { token: `Bearer ${token}` }
    });
    console.log("333");
    res.status(201).json({
      ok: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Comuniquese con el administrador",
    });
  }
}

async function setNumber() {
  const getAllMembers = await Member.find();
  let number = 0;
  let i = 0;
  try {
    const getAllMembers = await Member.find();
    console.log(getAllMembers);
    for (const member of getAllMembers) {
      console.log(i);
      number = 0;
      number = member.selectionHistory.length + member.cohortHistory.length;
      member.number = number;
      const upd = await Member.findByIdAndUpdate(member._id, member, {
        new: true,
      });
      i++;
    }
    return res.status(200).json({
      ok: true,
      msg: "Todo ok",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Comuniquese con el administrador",
    });
  }
}

async function setStack(req, res) {
  const filtro = "gloriaramosmoran@gmail.com";

  // const getAllMembers = await Member.find({
  //   // "cohortHistory.cohort": currentcohort.id,
  //   // "cohortHistory.cohort": current.id,
  // });

  const getAllMembers = await Member.find({
    "selectionHistory.selection": currentselection.id,
  });

  console.log(getAllMembers.length);
  // return;

  try {
    for (const member of getAllMembers) {
      if (member.filterPassed == true) {
        // console.log(member.selectionHistory.length);
        const selection = member.selectionHistory.find(
          (s) => s.selection == currentselection.id
        );

        if (selection) {
          //Si es front de React
          if (
            selection.area == "Front-End" &&
            selection.vertical == "Web App" &&
            (selection.language == "Javascript" ||
              selection.language == "Typescript") &&
            selection.stack.includes("React")
          ) {
            console.log(member.email);
            selection.stack = "React";
            const upd = await Member.findOneAndUpdate(
              {
                _id: member._id,
                "selectionHistory.selection": currentselection.id,
              },
              {
                $set: { "selectionHistory.$.stack": selection.stack },
              },
              { new: true }
            );
          }
          // }
          //SI es front angular
          // if (
          //   selection.area == "Front-End" &&
          //   (selection.language == "Javascript" ||
          //     selection.language == "Typescript") &&
          //   selection.stack.includes("R!act Native")
          // ) {
          //   console.log(member.email);
          //   selection.stack = "React Native";
          //   const upd = await Member.findOneAndUpdate(
          //     {
          //       _id: member._id,
          //       "selectionHistory.selection": currentselection.id,
          //     },
          //     {
          //       $set: { "selectionHistory.$.stack": selection.stack },
          //     },
          //     { new: true }
          //   );
          // }
          ////////////////////////////////////////////////////////////////
          // Si es back node
          // if (
          //   selection.area == "Back-End" &&
          //   (selection.language == "Javascript" ||
          //     selection.language == "Typescript") &&
          //   selection.stack.includes("Node")
          // ) {
          //   console.log(member.email);
          //   selection.stack = "Node";
          //   const upd = await Member.findOneAndUpdate(
          //     {
          //       _id: member._id,
          //       "selectionHistory.selection": currentselection.id,
          //     },
          //     {
          //       $set: { "selectionHistory.$.stack": selection.stack },
          //     },
          //     { new: true }
          //   );
          // }
          ////////////////////////////////////////////////////////////////
          ////////////////////////////////////////////////////////////////
          //SI es back python
          // if (selection.area == "Back-End" && selection.language == "PHP") {
          //   selection.stack = "Laravel";
          //   const upd = await Member.findOneAndUpdate(
          //     {
          //       _id: member._id,
          //       "selectionHistory.selection": currentselection.id,
          //     },
          //     {
          //       $set: { "selectionHistory.$.stack": selection.stack },
          //     },
          //     { new: true }
          //   );
          // }
        }
      } else if (member.filterPassed == false) {
        const cohort = member.cohortHistory.find(
          (c) => c.cohort == currentcohort.id
        );
        if (cohort) {
          // Si es front de React
          // if (
          //   cohort.vertical == "Web App" &&
          //   cohort.area == "Front-End" &&
          //   (cohort.language == "Javascript" ||
          //     cohort.language == "Typescript") &&
          //   cohort.stack.includes("React")
          // ) {
          //   console.log(member.email);
          //   cohort.stack = "React";
          //   const upd = await Member.findOneAndUpdate(
          //     {
          //       _id: member._id,
          //       "cohortHistory.cohort": currentcohort.id,
          //     },
          //     {
          //       $set: { "cohortHistory.$.stack": cohort.stack },
          //     },
          //     { new: true }
          //   );
          // }
          // if (
          //   cohort.area == "Back-End" &&
          //   (cohort.language == "Javascript" ||
          //     cohort.language == "Typescript") &&
          //   cohort.stack.includes("Node")
          // ) {
          //   cohort.stack = "Node";
          //   console.log(member.email);
          //   const upd = await Member.findOneAndUpdate(
          //     {
          //       _id: member._id,
          //       "cohortHistory.cohort": currentcohort.id,
          //     },
          //     {
          //       $set: { "cohortHistory.$.stack": cohort.stack },
          //     },
          //     { new: true }
          //   );
          // }
          // if (
          //   cohort.area == "Mobile" &&
          //   (cohort.language == "Python" || cohort.language == "Typesasdcript")
          //   // &&
          //   // cohort.stack.includes(".Net")
          // ) {
          //   cohort.stack = "Django";
          //   console.log(member.email);
          //   const upd = await Member.findOneAndUpdate(
          //     {
          //       _id: member._id,
          //       "cohortHistory.cohort": currentcohort.id,
          //     },
          //     {
          //       $set: { "cohortHistory.$.stack": cohort.stack },
          //     },
          //     { new: true }
          //   );
          // }
        }
      }
    }
    console.log("Listo");
    res.status(200).json({ msg: "OK" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Comuniquese con el administrador",
    });
  }
}

async function putScore(req, res) {
  let { email, score } = req.body;
  let emailLow = email.toLowerCase();

  try {
    const member = await Member.findOneAndUpdate(
      { email: emailLow },
      { $set: { score: score } },
      { new: true }
    );
    res.status(200).json({
      ok: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Comuniquese con el administrador",
    });
  }
}

async function removeHackathonMVP(req, res) {
  let { email } = req.body;
  console.log(email);
  let emailLow = email.toLowerCase();

  try {
    const member = await Member.findOneAndUpdate(
      { email: emailLow },
      { $set: { hackathonMVPHistory: [] } },
      { new: true }
    );
    res.status(200).json({
      ok: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Comuniquese con el administrador",
    });
  }
}

// async function removeWrongInscription(req, res) {
//   let emails = ["mateoroserok13@gmail.com"];

//   for (let index = 0; index < emails.length; index++) {

//   }

// }

async function putSlack(req, res) {
  let { email, slack } = req.body;
  // console.log(email);
  let emailLow = email.toLowerCase();

  try {
    const member = await Member.findOneAndUpdate(
      { email: emailLow },
      { $set: { slack: slack } },
      { new: true }
    );
    if (member) {
      res.status(200).json({
        ok: true,
      });
    } else {
      res.status(404).json({
        ok: false,
        msg: "No se encontró al usuario",
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

async function putSlackSeleccionado(req, res) {
  let { email, slackSeleccionado } = req.body;
  // console.log(email);
  let emailLow = email.toLowerCase();

  try {
    const member = await Member.findOneAndUpdate(
      { email: emailLow },
      { $set: { slackSeleccionado: slackSeleccionado } },
      { new: true }
    );
    if (member) {
      res.status(200).json({
        ok: true,
      });
    } else {
      res.status(404).json({
        ok: false,
        msg: "No se encontró al usuario",
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

async function desasignar(req, res) {
  let { email } = req.body;
  console.log(email);
  let emailLow = email.toLowerCase();
  // const member = await Member.findOneAndUpdate(
  //   { email: emailLow },
  //   { $pull: { cohortHistory: { cohort: currentcohort.id } } },
  //   { new: true }
  // );

  const member = await Member.findOneAndUpdate(
    { email: emailLow },
    { $pull: { hackathonMVPHistory: { hackathon: 3 } } },
    { new: true }
  );

  if (member) {
    res.status(200).json({
      ok: true,
    });
  } else {
    res.status(404).json({
      ok: false,
      msg: "No se encontró al usuario",
    });
  }
}

module.exports = {
  getAllMember,
  postMember,
  putMember,
  putAssign,
  putMemberDemo,
  getNewMembers,
  getActualMembers,
  putHackathon,
  putHackathonMVP,
  putChallenge,
  putVertical,
  setNumber,
  setStack,
  postForm,
  putScore,
  getActualHackathonMembers,
  removeHackathonMVP,
  getActualFullMembers,
  putSlack,
  putSlackSeleccionado,
  desasignar,
};
