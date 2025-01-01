const express = require("express");
const dotenv = require("dotenv");
const dbConection = require("./database/config");
const cors = require("cors");
const useMember = require("./routes/Member");
const useHackathon = require("./routes/Member");
const useChallenge = require("./routes/Member");
const useNewMember = require("./routes/Member");
const useActualMember = require("./routes/Member");
const useSelectedMember = require("./routes/SelectedMember");
const useActualSelectedMember = require("./routes/SelectedMember");
const useMemberId = require("./routes/MemberId");
const useSuspend = require("./routes/MemberId");
const useAssignment = require("./routes/MemberId");
const useTeam = require("./routes/Team");
const useActualTeam = require("./routes/Team");
const useActualselTeam = require("./routes/Team");
const useUser = require("./routes/User");
const authRegister = require("./routes/Auth");
const authLogin = require("./routes/Login");
const authGetPass = require("./routes/Auth");
const useMail = require("./routes/Mail");
const useMailTeams = require("./routes/Mail");
const useMailhackathon = require("./routes/Mail");
const useMailChallenge = require("./routes/Mail");
const useTeamLeader = require("./routes/Teamleader");
const useReview = require("./routes/Review");
const useFilterPassed = require("./routes/SelectedMember");
const useDate = require("./routes/Dates");

//Inicio de servidor de expresss
const app = express();
//Manejo de Variables de entorno
dotenv.config();
//lectura y parseo del body
app.use(express.json());
//Conexion a la base de datos
dbConection();
//Cors
app.use(cors());
app.use(express.static("public"));
app.use("/api/members", useMember);
app.use("/api/members/setvertical", useMember);
app.use("/api/members/desasignar", useMember);
app.use("/api/members/setnumber", useMember);
app.use("/api/members/setstack", useMember);
app.use("/api/members/setscore", useMember);
app.use("/api/members/setslack", useMember);
app.use("/api/members/setslackseleccionado", useMember);
app.use("/api/members/form", useMember);
app.use("/api/members/new", useNewMember);
app.use("/api/members/actual", useActualMember);
app.use("/api/members/actualfull", useActualMember);
app.use("/api/members/actualhackathon/", useActualMember);
app.use("/api/selection", useSelectedMember);
app.use("/api/selection/actual", useActualSelectedMember);
app.use("/api/selection/filterpassed", useFilterPassed);
app.use("/api/member", useMemberId);
app.use("/api/ledteams/:id", useMemberId);
app.use("/api/member/suspend", useSuspend);
app.use("/api/member/assignment", useAssignment);
app.use("/api/teams", useTeam);
app.use("/api/teams/:teamid", useTeam);
app.use("/api/teams/approved/:teamid", useTeam);
app.use("/api/teams/teamleaders", useTeam);
app.use("/api/teams/actual", useActualTeam);
app.use("/api/teams/actualselection", useActualselTeam);
app.use("/api/teams/actualfull", useActualselTeam);
app.use("/api/teams/actualhackathon", useActualselTeam);
app.use("/api/users", useUser);
app.use("/api/register", authRegister);
app.use("/api/login", authLogin);
app.use("/api/mail", useMail);
app.use("/api/mail/teams", useMailTeams);
app.use("/api/mail/hackathon", useMailhackathon);
app.use("/api/mail/brevo", useMailhackathon);
// app.use("/api/mail/hackathon", useMailhackathon);
app.use("/api/mail/challenge", useMailChallenge);
app.use("/api/memberid", useMemberId);
app.use("/api/teamleader", useTeamLeader);
app.use("/api/userauth", authGetPass);
app.use("/api/members/hackathon", useHackathon);
app.use("/api/members/hackathonmvp", useHackathon);
// app.use("/api/members/hackremove", useHackathon);
app.use("/api/members/hackremove", useHackathon);
app.use("/api/members/challenge", useChallenge);
app.use("/api/review", useReview);
app.use("/api/dates", useDate);

app.post("/webhook", (req, res) => {
  console.log("Prueba de webhook");
  res.status(200).json({ msg: "Webhook", mensaje: req.body });
});

//Backend

app.use("/", (req, res) => {
  res.status(201).json({ msg: "No Country" });
});
const HOST = process.env.HOST || "0.0.0.0";
const PORT = process.env.PORT || 5000;

app.listen(PORT, HOST, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
