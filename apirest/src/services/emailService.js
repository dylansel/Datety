/*En este service se encuentran todas 
las funciones necesarias para mandar un email desde la api*/

const nodemailer = require('nodemailer');


const jConfig = {
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "dylan.seltzer.et32@gmail.com",
      pass: "Dylansel32",
    },
  };
const transporter = nodemailer.createTransport(jConfig);


const mailOptions = {
    from: from,
    to: data.destinatario,
    subject: data.asunto,
    text: data.body
  };

  const info = await transporter.sendMail(mailOptions);
  console.log('Correo electrónico enviado: ' + info.response);

