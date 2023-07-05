
const { sendEmail } = require("../services/emailService");
const { getUserById } = require("../services/userService");

  const styleHeader = "background:'blue',width:'100%',height:'6rem',margin:'auto 2rem',margin-buttom:'4rem',display:'flex',align-item:'center',justify-content:'center'";
    
    
    
    
    
    
    
    





 async function resetPassword(idUser){
  try {
    //Manda email en caso de haberlo creado
      
      const user = await getUserById(idUser);

      
      if(!user){throw new Error("Error al agregar usuarios")}
      const html =  `
      <div style="background:blue">
      <h1>RESETEAR CONTRASEÑA</h1>
      </div>
      <h1>Hola ${user.name}, Para resetear la contraseña tenes que ingresar al siguiente link...</h1>

      `
      const data = {
          to: user.email,
          subject: "Recupera contraseña DateTy",
          html
        };
      console.log(data)
      await sendEmail(data);
  } catch (error) {
    console.log(error)
  }
    

}

module.exports = {
    resetPassword,
  }




