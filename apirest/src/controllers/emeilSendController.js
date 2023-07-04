
const { enviarCorreo } = require("../services/emailService");
const { getUserById } = require("../services/userService");


 async function resetPassword(idUser){

    //Manda email en caso de haberlo creado
    
    const user = await getUserById(idUser);
    console.log(user)
    // const userEmeil = user.email;
    const userEmeil = "dylan.seltzer.et32@gmail.com";
    const data = await{
        to: userEmeil,
        subject: "Recupera contraseña DateTy",
        html:`<h1>Hola ${user["name"]}, Para resetear la contraseña tenes que ingresar al siguiente link...</h1>}`
      };
    await enviarCorreo(data);

}

module.exports = {
    resetPassword,
  }




