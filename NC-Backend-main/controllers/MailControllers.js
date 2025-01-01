const nodemailer = require("nodemailer");
const { currentcohort } = require("../variables/cohortes");
const { currentselection } = require("../variables/cohortes");
const { currenthackathon } = require("../variables/cohortes");
const brevo = require("@getbrevo/brevo");
const fs = require("fs");
const {
  cohortbody,
  hackathonBody,
  challengeBody,
  databody,
  nocodeBody,
  regularBody,
} = require("../variables/mailbody");
const { selectionBody } = require("../variables/mailbody");
const { createTableTeams } = require("../variables/mailbody");
require("dotenv").config();
const token = process.env.MAIL_TOKEN;

async function postMail(req, res) {
  let { email, firstname, filterPassed, vertical, area, stack, experience } =
    req.body;

  let instancia = "";
  const cohorttext = `<br><p>Gracias por inscribirte al Cohorte ${currentcohort.id} !!! La fecha de inicio sera el día ${currentcohort.fecha}</p>`;
  const selectiontext = `<br><p>Gracias por inscribirte a la emulación S${currentselection.id} !!! La fecha de inicio sera el día ${currentselection.fecha}</p>`;

  try {
    let mailbody = `<b>¡Hola ${firstname}!</b>`;

    if (filterPassed === true) {
      instancia = `Seleccionado ${currentselection.id}`;
    } else {
      instancia = `Cohorte ${currentcohort.id}`;
    }

    mailbody += `<p1>¡Felicitaciones por regístrate en la próxima <b>Simulación Laboral Tech! </b> <br>
    Serás parte del ${instancia}</p1>
    <br><br>
    <b>Detalle de inscripción:
    <br>Vertical: </b> ${vertical}
    <br><b>Rol: </b> ${area}
    <br><b>Stack: </b> ${stack}
    <br><b>Experiencia: </b> ${experience}
    <br><br>
    <em>DISCLAIMER: No somos un bootcamp. No somos un curso. Te recordamos que esta aceleración es gratis e ilimitada, por lo tanto te vamos a pedir compromiso, respeto y entrega durante la simulación.</em></p1>
    <h3>Que sucede dentro de la simulación:</h3>
    <ol>
      <li>Vas a seguir aprendiendo tecnología pero en equipo. </li>
      <li>Trabajarás con otros roles así que prepárate a interactuar con un equipo multidisciplinario.</li>
      <li>Vas a poner a prueba tus soft skills recibiendo feedback de tus compañeros y team leader.</li>
      <li>Superar el Síndrome del Impostor depende de tu voluntad en socializar y superar desafíos en equipo.</li>
  
    </ol>
    <h3>Próximos pasos: </h3>
    <ul>
      
      <li>El Lunes ${currentselection.fecha} marcará el inicio oficial de la simulación. La misma tendrá lugar en nuestro espacio de Slack.</li>
    </ul>
    <br>
    <p1>Pronto te compartiremos la guía detallada del funcionamiento.
    <br><b><a href="https://join.slack.com/t/no-country/shared_invite/zt-2wxazmgtc-y3nL9APju3zisxIuHZC02A">Unite a Slack</a></b>
    <br><br>
    <b>Evidenciando el valor de los juniors.<b>
    <br><br> <a title="No Country" href="nocountry.tech"><img src="https://i.im.ge/2022/07/20/F2Fspa.png"/></a>;
    `;

    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "nocountryforjuniordevs@gmail.com",
        pass: token,
      },
    });

    let mailOptions = {
      from: "No-Country Incripciones <noreplynocountry@gmail.com>",
      to: email,
      subject: "No Country - Inscripcion Simulación 👩‍💻👨‍💻",
      html: mailbody,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    res.json({ ok: true });
    res.status(201);
  } catch (error) {
    res.status(500).json(error);
  }
}

async function postMailhackathon(req, res) {
  let { email, firstname } = req.body;

  try {
    let mailbody = `<b>¡Hola ${firstname}!</b>`;

    mailbody += hackathonBody;

    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "nocountryforjuniordevs@gmail.com",
        pass: token,
      },
    });

    let mailOptions = {
      from: "No-Country Incripciones <noreplynocountry@gmail.com>",
      to: email,
      subject: "Convertite en Blockchain Developer - No Country Hackathon💙",
      html: mailbody,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    res.json({ ok: true });
    res.status(201);
  } catch (error) {
    res.status(500).json(error);
  }
}

async function postMailTeams(req, res) {
  const mails = req.body.mails;
  const members = req.body.members;
  const teamName = req.body.teamName;

  const table = createTableTeams(members, teamName);

  try {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "nocountryforjuniordevs@gmail.com",
        pass: token,
      },
    });

    let mailOptions = {
      from: "No-Country Incripciones <noreplynocountry@gmail.com>",
      // to: 'nocountryforjuniordevs@gmail.com',
      // to: "julioignaciootero@gmail.com",
      to: mails,
      subject: `Equipo asignado: ${teamName} 💙`,
      html: table,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log("No se pudo enviar :", teamName);
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    res.json({ ok: true });
    res.status(201);
  } catch (error) {
    console.log(error);
  }
}

async function postMailChallenge(req, res) {
  let { email, firstname } = req.body;

  try {
    let mailbody = `<b>¡Hola ${firstname}!</b>`;

    mailbody += challengeBody;

    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "nocountryforjuniordevs@gmail.com",
        pass: token,
      },
    });

    let mailOptions = {
      from: "No-Country Incripciones <noreplynocountry@gmail.com>",
      to: email,
      subject: "Gánate una computadora! - Hackathon No Code - No Country 💙",
      html: mailbody,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    res.json({ ok: true });
    res.status(201);
  } catch (error) {
    res.status(500).json(error);
  }
}

async function postMailBrevo(req, res) {
  // let { email, firstname } = req.body;

  //brevo config
  const apiInstance = new brevo.TransactionalEmailsApi();
  apiInstance.setApiKey(
    brevo.TransactionalEmailsApiApiKeys.apiKey,
    process.env.BREVO_API
  );

  const sendSmtpEmail = new brevo.SendSmtpEmail();
  sendSmtpEmail.subject = "Esto es una prueba";
  sendSmtpEmail.to = [
    { email: "contacto@nocountry.io", name: "Julio No Country" },
  ];
  sendSmtpEmail.htmlContent = `<h1>Hello world</><br><br><p>Pruebita</>`;
  sendSmtpEmail.sender = {
    name: "Julio No Country",
    email: "julio@nocountry.io",
  };

  const imagen = "C:/Users/julio/OneDrive/Escritorio/cranusasdasd.jpg";
  //   "https://static.vecteezy.com/system/resources/previews/007/409/979/non_2x/people-icon-design-avatar-icon-person-icons-people-icons-are-set-in-trendy-flat-style-user-icon-set-vector.jpg";
  // sendSmtpEmail.attachment = [{ name: "CRANUS", url: imagen }];
  const imageContent = fs.readFileSync(imagen).toString("base64");
  sendSmtpEmail.attachment = [
    {
      name: "cranus.jpg", // Name of the file attachment
      content: imageContent,
      // content: Buffer.from(
      //   "C:/Users/julio/OneDrive/Escritorio/cranus.jpg"
      // ).toString("base64"), // File content in Base64 encoding},
    },
  ];

  //brevo config

  console.log("Intentando");
  try {
    const result = await apiInstance.sendTransacEmail(sendSmtpEmail);
    console.log(result);
    res.json({ ok: true });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }

  // try {
  //   let transporter = nodemailer.createTransport({
  //     service: "smtp-relay.brevo.com", // puedes usar otros servicios como Outlook, Yahoo, etc.
  //     //   service: "gmail", // puedes usar otros servicios como Outlook, Yahoo, etc.
  //     port: 587,
  //     secure: false,
  //     auth: {
  //       user: "7d9583001@smtp-brevo.com", // tu email
  //       // user: "7d9583001@smtp-brevo.com", // tu email
  //       pass: "CVZ3fWQFTXhSvYLy",
  //     },
  //   });

  //   let mailOptions = {
  //     from: "7d9583001@smtp-brevo.com", // remitente
  //     to: "julioignaciootero@gmail.com", // destinatario
  //     subject: "Correo de prueba", // asunto
  //     text: "Este es un correo de prueba enviado con Nodemailer.", // contenido del correo
  //   };

  //   transporter.sendMail(mailOptions, (error, info) => {
  //     if (error) {
  //       return console.log("Error al enviar el correo:", error);
  //     }
  //     console.log("Correo enviado: " + info.response);
  //   });

  //   res.json({ ok: true });
  //   res.status(201);
  // } catch (error) {
  //   res.status(500).json(error);
  // }
}

module.exports = {
  postMail,
  postMailhackathon,
  postMailChallenge,
  postMailTeams,
  postMailBrevo,
};
