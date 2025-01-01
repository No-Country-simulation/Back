const { currentcohort } = require("../variables/cohortes");
const { currentselection } = require("../variables/cohortes");
const { currentchallenge } = require("../variables/cohortes");

let cohortbody = `<p1><b>Bienvenid@ al Cohorte ${currentcohort.id}!</b> <br>`;

cohortbody +=
  "Este es un momento histórico y especial! ¡El día en que los juniors nos agrupamos como fuerza 💥 para acelerar nuestras carreras profesionales! 💪 <br>";

cohortbody +=
  "Queremos en primer lugar agradecerte por la confianza depositada en nosotros y decirte que nuestro compromiso como organización es 100%. Nuestra misión es acortar la distancia entre las empresas y los perfiles IT gracias a la evidencia empírica registrada en la emulación brindada por No Country";

cohortbody +=
  "<br><br>Te recordamos que esta aceleración es gratis e ilimitada, por lo tanto te vamos a pedir compromiso, respeto y entrega durante las 5 semanas siguientes. Vas a trabajar en un equipo multidisciplinario junto a otros roles y es vital respetar el tiempo y esfuerzo de tod@s. Si superas esta instancia vas a ser parte de nuestro Seleccionado para seguir entrenando y acceder a conexiones laborales.";

cohortbody +=
  "<br>Nuestra misión es acortar la distancia entre las empresas y vos. 💫";

cohortbody +=
  "<br><br> Te adjuntamos el reglamento con los valores y reglas que manejamos en No Country con el propósito de que puedas sacar el máximo beneficio a la experiencia. ";
cohortbody +=
  '<br> <a href="https://drive.google.com/file/d/1_1rJqTl_FN3LsNtnQI1SFWQ32J2bH4AD/view?usp=sharing"><b> Guía informativa - Web App</b> </a>';
cohortbody += "<br><b><br><br>¿Cuáles son los próximos pasos? 👇 </b>";
cohortbody += `<br>1)Te vamos a agregar al canal privado Cohorte ${currentcohort.id} `;
cohortbody += "<br>2)Te vamos a invitar a nuestra organización en Github";
cohortbody += `<br>3)Una vez finalizada la etapa de Onboarding seleccionaremos los equipos.`;
cohortbody += "<br>Te invitamos a unirte a nuestra comunidad en Discord:";

cohortbody +=
  '<br> <a href="https://discord.gg/ZdMr6NFWUq"> No Country Discrod </a>';

cohortbody += "<br><br> <b>Que dicen de nosotros los medios? 👇</b>";

cohortbody +=
  '<br> <a href="https://www.a24.com/trends/de-una-idea-silicon-valley-leandro-buzeta-bernasconi-crea-no-country-la-exitosa-startup-que-conecta-desarrolladores-empresas-n1031759"> Nota: La exitosa startup que conecta desarrolladores con empresas </a>';

cohortbody += `<br><br> <a title="No Country" href="nocountry.tech"><img src="https://i.im.ge/2022/07/20/F2Fspa.png"/></a>`;

let nocodeBody = `<p1><b>Bienvenid@ al Cohorte ${currentcohort.id}!</b> <br>`;

nocodeBody +=
  "Este es un momento histórico y especial! ¡El día en que los juniors nos agrupamos como fuerza 💥 para acelerar nuestras carreras profesionales! 💪 <br>";

nocodeBody +=
  "Queremos en primer lugar agradecerte por la confianza depositada en nosotros y decirte que nuestro compromiso como organización es 100%. Nuestra misión es acortar la distancia entre las empresas y los perfiles IT gracias a la evidencia empírica registrada en la emulación brindada por No Country";

nocodeBody +=
  "<br><br>Te recordamos que esta aceleración es gratis e ilimitada, por lo tanto te vamos a pedir compromiso, respeto y entrega durante las 5 semanas siguientes. Vas a trabajar en un equipo multidisciplinario junto a otros roles y es vital respetar el tiempo y esfuerzo de tod@s. Si superas esta instancia vas a ser parte de nuestro Seleccionado para seguir entrenando y acceder a conexiones laborales.";

nocodeBody +=
  "<br>Nuestra misión es acortar la distancia entre las empresas y vos. 💫";

nocodeBody +=
  "<br><br> Te adjuntamos el reglamento con los valores y reglas que manejamos en No Country con el propósito de que puedas sacar el máximo beneficio a la experiencia. ";
nocodeBody +=
  '<br> <a href="https://drive.google.com/file/d/1nACTyyBSJPBF805rDk8orYL6Hz8odgJo/view?usp=sharing"><b> Guía informativa - No Code</b> </a>';
nocodeBody += "<br><b><br><br>¿Cuáles son los próximos pasos? 👇 </b>";
nocodeBody += `<br>1)Te vamos a agregar al canal privado Cohorte ${currentcohort.id}  `;
nocodeBody += "<br>2)Te vamos a invitar a nuestra organización en Github";
nocodeBody += `<br>3)Una vez finalizada la etapa de Onboarding seleccionaremos los equipos.`;
nocodeBody += "<br>Te invitamos a unirte a nuestra comunidad en Discord:";

nocodeBody +=
  '<br> <a href="https://discord.gg/ZdMr6NFWUq"> No Country Discord </a>';

nocodeBody += "<br><br> <b>Que dicen de nosotros los medios? 👇</b>";

nocodeBody +=
  '<br> <a href="https://www.a24.com/trends/de-una-idea-silicon-valley-leandro-buzeta-bernasconi-crea-no-country-la-exitosa-startup-que-conecta-desarrolladores-empresas-n1031759"> Nota: La exitosa startup que conecta desarrolladores con empresas </a>';

nocodeBody += `<br><br> <a title="No Country" href="nocountry.tech"><img src="https://i.im.ge/2022/07/20/F2Fspa.png"/></a>`;

let selectionBody = "<b>¡Hola Junior! </b> 😎";

selectionBody += `<br><br>Felicitaciones por haberte registrado en una nueva emulación del Seleccionado para seguir potenciando tus habilidades. 💙`;
// selectionBody += "<br><br>Hemos creado un canal privado exclusivo para los integrantes del Seleccionado que se anotaron en esta nueva emulación, por favor si aun no estas invitado escribenos por privado para agregarte."
selectionBody +=
  "<br><br>Te adjuntamos en el siguiente link las condiciones de la emulación del Seleccionado";
selectionBody +=
  '<br> <a href="https://drive.google.com/file/d/1o43OT2-t7vlujx19emF9uPKiJYWPVXJ2/view?usp=sharing"><b> Condiciones generales Seleccionado </b> </a>';
selectionBody +=
  '<br> <a href="https://drive.google.com/file/d/1MJIDQLcbZVnTE1BtfyBkNSNGPFbMWnfc/view?usp=sharing"><b> Condiciones generales Seleccionado No Code </b> </a>';
selectionBody +=
  "<br><br>Cada vez está más cerca esa oportunidad laboral, es crucial seguir evidenciando tu valor! Recuerda que en esta instancia no permitimos bajas ni reubicaciones, respetando el compromiso y el tiempo de tod@s.";
selectionBody += "<br><br>Te deseamos muchos éxitos!";
selectionBody += "<br><br> <b>Que dicen de nosotros los medios? 👇</b>";

selectionBody +=
  '<br> <a href="https://www.a24.com/trends/de-una-idea-silicon-valley-leandro-buzeta-bernasconi-crea-no-country-la-exitosa-startup-que-conecta-desarrolladores-empresas-n1031759"> Nota: La exitosa startup que conecta desarrolladores con empresas </a>';

selectionBody += `<br><br> <a title="No Country" href="nocountry.tech"><img src="https://i.im.ge/2022/07/20/F2Fspa.png"/></a>`;

let hackathonBody = `<br><br>Felicitaciones por haberte registrado al Hackathon! 💙`;

hackathonBody +=
  "<br>Sera un evento inolvidable con varios desafios tecnicos, donde el ganador conseguira trabajo como <b>Blockchain Developer para Chronospay!</b>";
hackathonBody += "<br>Quedan los últimos lugares para participar!</b>";

hackathonBody +=
  "<br><br>Esta es una oportunidad para devs validados de No Country, en esta ocasión decidimos darle la oportunidad a toda la comunidad. Sabemos que hay muchas personas que merecen una oportunidad. ";
// hackathonBody += "<br>No Country evidencia el valor de los desarrolladores y los conecta con las oportunidades. <br><br>"

hackathonBody += "<br><br><b>PRUEBA TÉCNICA:</b>";
hackathonBody +=
  '<br>Deberás completar la siguiente prueba técnica: <a href="https://quest.stellar.org/learn"> Stellar Quest</a>';

hackathonBody += "<br><br><b>Instrucciones: </b><br>";
hackathonBody += "Deberás completar los 10 Pasos de la Evaluación";
hackathonBody +=
  "<br>Son auto evaluativos, se van desbloqueando a medida que avances.";
hackathonBody +=
  '<br>Una vez que finalices deberás enviarnos un mail a <a href="info@nocountry.tech">info@nocountry.tech</a> con Asunto: Quiero participar del Hackathon , comunicando que completaste la prueba y confirmando tu disponibilidad para asistir al evento.';

hackathonBody +=
  "<br>Deberás enviarnos capturas de pantalla con los tests superados.";
hackathonBody += "<br>Tienes tiempo hasta mañana Viernes 23/09 15hs. (Arg)";

hackathonBody += "<br><br><b>INFORMACIÓN IMPORTANTE</b>";

hackathonBody +=
  "<br>Enviar las capturas de pantalla de TODOS los tests superados.";
hackathonBody +=
  "<br>El evento es presencial y comienza a las 10 am puntualmente en Av Dorrego 2133, Palermo, CABA (Huerta Coworking).";
hackathonBody +=
  "<br>Tener pensado el viaje hasta el lugar ( auto, remis, colectivo, subte, tren, etc )";
hackathonBody += "<br>El puesto laboral es 100% remoto.";

// hackathonBody += '<br> <a href="https://docs.google.com/document/d/1nkNoOFZlqc0MQdnql_xPhKyy17UwBGyTQjcL7M6h8ag/edit?usp=sharing"> Bases y Condiciones </a>'

hackathonBody +=
  '<br><a href="https://im.ge/i/O00frX"><img src="https://i.im.ge/2022/08/23/O00frX.Hackathon.jpg" alt="Hackathon" border="0"></a>';
hackathonBody += "<br><br>Te deseamos muchos exitos!";
hackathonBody += `<br><br> <a title="No Country" href="nocountry.tech"><img src="https://i.im.ge/2022/07/20/F2Fspa.png"/></a>`;

let challengeBody = `<br> Felicitaciones por haberte registrado al Hackathon No Code! Vas a competir por una computadora nueva! Vas a poder renovar tu herramienta de trabajo!
                    <br>Serán 21 días desafiantes donde deberás desarrollar un proyecto con tecnologías No Code.
                    <br><br>Los proyectos de la competencia serán dos:
                    <br><br><b>Proyecto App</b> 📱
                    <br>Plataforma a utilizar: Adalo
                    <br><b>Proyecto Dashboard</b> 📊
                    <br>Plataforma a utilizar: Bubble
                    <br><br>La asignación del proyecto será al azar. El viernes 14/10 te comunicaremos cual es el proyecto que se te ha asignado y te compartiremos las credenciales para comenzar a trabajar.
                    <br>
                    <b>Mientras tanto te recomendamos comenzar a estudiar las plataformas:
                    <br><br>Adalo</b> Es una herramienta no-code que te permite construir apps nativas sin código.
                    <br><a href="https://adalo.com/">https://adalo.com/</a>
                    <br><br>
                    <a href="https://help.adalo.com/how-to">Adalo - Tutorial </a>
                    <br><br>
                    <a href="https://www.youtube.com/watch?v=OwUeMAWpDac">Adalo - Tutorial No Code </a>
                    <br><br>
                    <b>Bubble</b>
                    <br>
                    Es una herramienta en auge que construye aplicaciones web sin código
                    <br><br>
                    <a href="https://bubble.io/">Bubble.io </a>
                    <br><br>
                    <a href="https://build.airdev.co/bootcamp">Bubble Bootcamp </a>
                    <br><br>
                    Vas a ser invitado a un canal privado donde continuaremos con la comunicación y novedades del Hackathon.
                    <br>
                    Te adjuntamos las bases y condiciones de la competencia.

                    <br> <a href="https://drive.google.com/file/d/1i3H5V-OdX4cXknk9mcFJWKskws-2R2ae/view?usp=sharing"> Bases y Condiciones </a>
                    
                    <br><br>
                    Te deseamos muchos exitos! 💙
                    <br><br>
                    <a title="No Code"><img src="https://i.im.ge/2022/10/10/1eGI3f.HACKATHON-PRE-MVP.md.png"/></a>
                    
                                    `;

let databody = `<p1><b>Bienvenid@ al Cohorte ${currentcohort.id}!</b> <br>`;
databody +=
  "Este es un momento histórico y especial! ¡El día en que los juniors nos agrupamos como fuerza 💥 para acelerar nuestras carreras profesionales! 💪 <br>";

databody +=
  "Queremos en primer lugar agradecerte por la confianza depositada en nosotros y decirte que nuestro compromiso como organización es 100%. Nuestra misión es acortar la distancia entre las empresas y los perfiles IT gracias a la evidencia empírica registrada en la emulación brindada por No Country";

databody +=
  "<br><br>Te recordamos que esta aceleración es gratis e ilimitada, por lo tanto te vamos a pedir compromiso, respeto y entrega durante las 5 semanas siguientes. Vas a trabajar en un equipo multidisciplinario junto a otros roles y es vital respetar el tiempo y esfuerzo de tod@s. Si superas esta instancia vas a ser parte de nuestro Seleccionado para seguir entrenando y acceder a conexiones laborales.";

databody +=
  "<br>Nuestra misión es acortar la distancia entre las empresas y vos. 💫";

databody += "<br><b><br><br>¿Cuáles son los próximos pasos? 👇 </b>";
databody += `<br>1)Te vamos a agregar al canal privado Cohorte ${currentcohort.id} `;
databody += "<br>2)Te vamos a invitar a nuestra organización en Github";
databody += `<br>3)Una vez finalizada la etapa de Onboarding seleccionaremos los equipos.`;
databody += "<br>Te invitamos a unirte a nuestra comunidad en Discord:";

databody +=
  '<br> <a href="https://discord.gg/ZdMr6NFWUq"> No Country Discrod </a>';

databody += "<br><br> <b>Que dicen de nosotros los medios? 👇</b>";

databody +=
  '<br> <a href="https://www.a24.com/trends/de-una-idea-silicon-valley-leandro-buzeta-bernasconi-crea-no-country-la-exitosa-startup-que-conecta-desarrolladores-empresas-n1031759"> Nota: La exitosa startup que conecta desarrolladores con empresas </a>';

databody += `<br><br> <a title="No Country" href="nocountry.tech"><img src="https://i.im.ge/2022/07/20/F2Fspa.png"/></a>`;

function createTableTeams(members, teamName) {
  let table = `<!DOCTYPE html>
    <html>
    <head>
    <style>
    table {
      font-family: arial, sans-serif;
      border-collapse: collapse;
      width: 100%;
    }
    
    td, th {
      border: 1px solid #dddddd;
      text-align: left;
      padding: 8px;
    }
    
    tr:nth-child(even) {
      background-color: #dddddd;
    }
    </style>
    </head>
    <body>`;

  if (members.length > 0) {
    table += `Hola Junior!
                  <br>Has sido asignado al equipo: <b>${teamName}</b>
                  <br>Se creara un canal de Slack con el nombre del equipo.
                  <br>El equipo esta conformado por los siguientes miembros: <br><br>`;

    table += `<table><tr><th>Nombre</th><th>Email</th><th>Tel:</th><th>Horario</th><th>Area</th><th>Stack</th><th>Lenguaje</th><th>Experiencia</th></tr>`;

    members.forEach((m) => {
      table += `<tr>
            <td>${m.fullname}</td>
            <td>${m.email}</td>
            <td>${m.phone}</td>
            <td>${m.availability}</td>
            <td>${m.area}</td>
            <td>${m.stack}</td>
            <td>${m.language}</td>
            <td>${m.experience}</td>            
          </tr>`;
    });

    table += "</table>";
  }

  table += `<br><br>
            Te deseamos muchos exitos! 💙
          
          <br><br> <a title="No Country" href="nocountry.tech"><img src="https://i.im.ge/2022/07/20/F2Fspa.png"/></a>`;
  table += `</body>   </html>`;

  return table;
}

let regularBody = `<p1>¡Felicitaciones por regístrate en la próxima <b>Simulación Laboral Tech! </b> <br>
                  Serás parte del cohorte 17 / seleccionado 14</p1>
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
                    <li>Hasta que la simulación comience, mantente atento en nuestro servidor de <b><a href="https://discord.gg/5MTzmsNXvx">Discord</a></b>. Haz amigos, networking, consulta dudas y obtén más información de personas que ya han transitado la simulación.</li>
                    <li>El Lunes 05/02/2024 marcará el inicio oficial de la simulación. La misma tendrá lugar en nuestro espacio de Slack, te compartiremos la invitación en los próximos dias.</li>
                  </ul>
                  <br>
                  <p1>Pronto te compartiremos la guía detallada del funcionamiento.
                  <br><b><a href="https://discord.gg/5MTzmsNXvx">Unite a Discord</a></b>
                  <br><br>
                  <b>Evidenciando el valor de los juniors.<b>
                  <br><br> <a title="No Country" href="nocountry.tech"><img src="https://i.im.ge/2022/07/20/F2Fspa.png"/></a>;
                  `;

module.exports = {
  cohortbody,
  selectionBody,
  hackathonBody,
  challengeBody,
  createTableTeams,
  databody,
  nocodeBody,
  regularBody,
};
