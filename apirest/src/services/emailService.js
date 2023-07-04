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

const email ={ 
    from:"ewebik@ewebik.com",  //remitente
    to:"contacto@ewebik.com",  //destinatario
    subject:"Nuevo mensaje de usuario",  //asunto del correo
    html:` 
        <div> 
        <p>Hola amigo</p> 
        <p>Esto es una prueba del vídeo</p> 
        <p>¿Cómo enviar correos eletrónicos con Nodemailer en NodeJS </p> 
        </div> 
    ` 
};
let createTransport = nodemailer.createTransport(jConfig);