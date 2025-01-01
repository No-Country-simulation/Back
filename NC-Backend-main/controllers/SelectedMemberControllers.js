const Member = require("../models/Member");
const { currentselection } = require("../variables/cohortes");

const toTitleCase = (phrase) => {
  return phrase
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

//TRAER TODOS LOS MIEMBROS CON FILTERPASSED = TRUE
async function getAllMembers(req, res) {
  //FALTA AGREGAR LA CONDICION
  const getAllMembers = await Member.find({ filterPassed: true });
  res.json({ ok: true, getAllMembers });
}

async function getActualMembers(req, res) {
  //FALTA AGREGAR LA CONDICION
  const getActualMembers = await Member.find({
    filterPassed: true,
    "selectionHistory.selection": currentselection.id,
  });
  res.json({ getActualMembers });
}

//SI FILTERPASSED = TRUE GUARDAR EN SELECCIONHISTORY LA INFO DEL FRONT
async function postMember(req, res) {
  const {
    firstname,
    lastname,
    age,
    from,
    email,
    stack,
    vertical,
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

  try {
    //CHEQUEAR SI filterPassed = TRUE
    //AGREGAR OBJETO A SELECTIONHISTORY
    const existingMember = await Member.findOne({ email: emailLow });
    const anotado = existingMember.selectionHistory.find(
      (s) => s.selection == currentselection.id
    );

    if (anotado != undefined) {
      return res.status(202).json({
        ok: false,
        msg: "Usuario ya registrado",
      });
    }

    if (existingMember.filterPassed === true) {
      let updatedMember = await Member.findByIdAndUpdate(existingMember._id, {
        $set: {
          fullname: fullnamePascal,
          firstname: firstnamePascal,
          lastname: lastnamePascal,
          age: age,
          from: from,
        },
      });

      updatedMember = await Member.findByIdAndUpdate(
        existingMember._id,
        {
          $addToSet: {
            selectionHistory: {
              selection: currentselection.id,
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
      console.log(emailLow);
      return res.status(200).json({
        ok: true,
        updatedMember: updatedMember,
        currentselection: currentselection,
      });
    }

    // SI FILTERPASSED ES = FALSE
    if (existingMember.filterPassed === false) {
      return res.send("Este junior no ha superado la primera instancia");
      // res.status(500).json({msg: "Este junior no ha superado la primera instancia",
      // filterPassed: existingMember.filterPassed})
    }
  } catch (error) {
    console.log(error);
    return res.send("No has superado la primera instancia");
    // res.status(500).json({
    //   ok: false,
    //   msg: "Comuniquese con el administrador",
    // });
  }
}

//RUTA PARA CAMBIAR EL FILTER A TRUE
async function putFilterTrue(req, res) {
  let email = req.body.email;

  try {
    const existingMember = await Member.findOne({ email: email });

    const updatedMember = await Member.findByIdAndUpdate(
      existingMember._id,
      {
        $set: {
          filterPassed: true,
        },
      },
      { new: true }
    );
    res.status(201).json(updatedMember);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      ok: false,
      msg: "Comuniquese con el administrador",
    });
  }
}

async function putFilter(req, res) {
  let email = req.body.email;
  const filter = req.body.filter;
  console.log(req.body.email, req.body.filter);

  try {
    const existingMember = await Member.findOne({ email: email });

    const updatedMember = await Member.findByIdAndUpdate(
      existingMember._id,
      {
        $set: {
          filterPassed: filter,
        },
      },
      { new: true }
    );
    res.status(201).json(updatedMember);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      ok: false,
      msg: "Comuniquese con el administrador",
    });
  }
}

//RUTA PARA CAMBIAR EL FILTER A FALSE
async function putFilterFalse(req, res) {
  let email = req.body.email;

  try {
    const existingMember = await Member.findOne({ email: email });

    const updatedMember = await Member.findByIdAndUpdate(
      existingMember._id,
      {
        $set: {
          filterPassed: false,
        },
      },
      { new: true }
    );
    res.status(201).json(updatedMember);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      ok: false,
      msg: "Comuniquese con el administrador",
    });
  }
}

module.exports = {
  getAllMembers,
  postMember,
  putFilterTrue,
  putFilterFalse,
  putFilter,
  getActualMembers,
};
