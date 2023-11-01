const CRUD = require('../services/crud')
const userService = require('../services/userService');
const { sendConfirmEmail } = require('../utils/emeilSendUtils');
const utils = require('../utils/utils')
const bcrypt = require('bcryptjs');
const { editSetting, addSetting } = require('../services/settingsService');

const getAllUsers = async (req,res) => {
  //esta funcion solo podria ser ejecutada por un admin
  try {
    const respuesta = await userService.getAllUsers();
    res.status(200).json(respuesta);
  }catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

const getUserById = async (req,res) => {
  //esta funcion solo podria ser ejecutada por un admin
  try {
    const id = req.params.id; // Obtener el ID del usuario desde la ruta
    const user = await userService.getUserById(id); 
    if (!(utils.isExist(user))){res.status(404).json({ message: 'User not found' });return;};
    res.status(200).json(user); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

const getCompleteUserById = async (req,res) => {
  //esta funcion solo podria ser ejecutada por un admin
  try {
    const id = req.params.id; // Obtener el ID del usuario desde la ruta
    const user = await userService.getCompleteUserById(id); 
    if (!(utils.isExist(user))){res.status(404).json({ message: 'User not found' });return;};
    res.status(200).json(user); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

const getUser = async (req,res) => {
  try {
    const id = req.user.idUser; // Obtener el ID del usuario desde el auth
    const user = await userService.getCompleteUserById(id); 
    console.log(user)
    if (!(utils.isExist(user))){res.status(404).json({ message: 'User not found' });return;};
    res.status(200).json(user); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}


const addUser = async (req, res) => {
  try {
    const data = req.body;

    // Verificar si el email ya está registrado
    const emailExists = await userService.getUserByColumn('email', data.email,null); //lo pongo con null el tercer prop para que tenga en cuenta los emails desaibilitados
    if (emailExists.length) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Verificar si el nombre de usuario ya está en uso
    const userNameExists = await userService.getUserByColumn("userName", data.userName,null); //lo pongo con null el tercer prop para que tenga en cuenta los users desaibilitados
    if (userNameExists.length) {
      return res.status(400).json({ message: 'Username already taken' });
    }

    // encriptar contraseña 
    const dataE = {
      ...data,
      password: await utils.encryptText(data.password) 
    }
    // Agregar usuario
    const id = await userService.addUser(dataE);
    if(!id) throw new Error('Error al agregar usuario');
    const token = utils.createToken({idUser:id}); // Crear el token JWT
    res.status(200).json({ token }); // Devolver el token en la respuesta
    if(!dataE.is_active){
      sendConfirmEmail(id);
    }
    const objSetings = {
      idUser:id,
      darkTheme:0,
      startSleep:"00:00:00",
      endSleep:"6:00:00"
    }
    const respuestaS = await addSetting(objSetings);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const editUser = async (req,res) => {
  try {
    const id = req.user.idUser; // Obtener el ID del usuario desde el auth
    
    // Obtener el usuario por ID
    const user = await userService.getUserById(id);
    // Validar si el usuario existe
    if (!utils.isExist(user)) {
      return res.status(404).json({ message: 'User not found' });
    }
    console.log(req.body)
    const fieldsUser = ["name","surname","password","email","userName","photo"]
    const fieldsSettings = ["darkTheme","startSleep","endSleep"]
    // Crea un objeto que contiene solo los campos que se proporcionaron para actualizar
    let dataUser = {};
    let dataSettings = {}
    for (const prop in req.body) {
      if(fieldsSettings.includes(prop)){
        dataSettings[prop] = req.body[prop];
      }else if(fieldsUser.includes(prop)){
        dataUser[prop] = req.body[prop];
      }
    }
    console.log(dataUser)
    console.log(dataSettings)
    if(dataUser.password!=undefined) {
      dataUser.password = await utils.encryptText(dataUser.password);
    }
    if(Object.keys(dataUser).length == 0 && Object.keys(dataSettings).length == 0){
      res.status(400).json({ message: 'fields not provided' });
      return;
    }
    if(Object.keys(dataUser).length > 0 ){
      const resultUser = await userService.editUser(dataUser, id); // Editar el usuario utilizando la función edit de CRUD
      
      if (resultUser === 0) { // Si el usuario no existe
        res.status(404).json({ message: 'User not edit' });
        return;
      }
    }

    if(Object.keys(dataSettings).length > 0){
      const resultSettings = await editSetting(dataSettings, id); // Editar el usuario utilizando la función edit de CRUD
      
      if (resultSettings === 0) { // Si el usuario no existe
        res.status(404).json({ message: 'Error to edited settings' });
        return;
      }
    }
    
    res.status(200).json({});
  }catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

const disableUser = async (req, res) => {
  try {
    const id = req.user.idUser; // Obtener el ID del usuario desde el auth
    
    // Obtener el usuario por ID
    const user = await userService.getUserById(id);
    // Validar si el usuario existe
    if (!utils.isExist(user)) {
      return res.status(404).json({ message: 'User not found' });
    }

    const data = { is_active: false }; // Actualiza el campo "is_active" a false para desactivar el usuario
    const result = await userService.editUser(data, id); // Editar el usuario utilizando la función edit de CRUD
    if (result === 0) { // Si el usuario no existe
      res.status(404).json({ message: 'User not deleted' });
      return;
    }
    res.status(200).json({});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

const deleteUser = async (req,res) => {
  try {
    //NO ES CORRECTO ELIMINAR UN USUARIO, SE DEBE DESACTIVAR NUNCA ELIMINAR. PERO POR NORMATIVA DEJO EL ENDPOINT
    const id = req.user.idUser; // Obtener el ID del usuario desde el auth
    const result = await CRUD.remove("user", id); // Eliminar el usuario utilizando la función remove de CRUD
    if (result === 0) { // Si el usuario no existe
      res.status(404).json({ message: 'User not found' });
      return;
    }
    res.status(200).json({}); //confirmo que se elimino correctamente
  }catch(error){
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

//Funciones especificas

const login = async (req, res) => {
  try {
    const user = req.body.user; // Obtener el nombre de usuario desde el body
    const password = req.body.password;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let userDB = null;
    if (emailRegex.test(user)) {
      userDB = await userService.getUserByColumn("email", user,null,["idUser","name","surname","email","userName","password","photo"]);
    } else {
      userDB = await userService.getUserByColumn("userName", user,null,["idUser","name","surname","email","userName","password","photo"]);
    }
    if (!(utils.isExist(userDB))) { res.status(404).json({ message: 'Invalid User' }); return; };
    const isMatch = await utils.hashCompare(password, userDB[0].password);
    if (!isMatch) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }
    const token = utils.createToken(userDB[0]); // Crear el token JWT
    res.status(200).json({ token }); // Devolver el token en la respuesta
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

const loginByGoogleId = async (req, res) => {
  try {
    const googleId = req.body.googleId
    
    const userDB = await userService.getUserByColumn("googleId", googleId,null,["idUser","name","surname","email","userName","password","photo"]);
    
    if (!(utils.isExist(userDB))) { res.status(404).json({ message: 'user not exist' }); return; };

   
    const token = utils.createToken(userDB[0]); // Crear el token JWT
    res.status(200).json({ token }); // Devolver el token en la respuesta
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}


const confirmEmail = async (req,res) => {
  try {
    const emailToken = req.params.token.replaceAll("*",".");
    const resToken = utils.verifyToken(emailToken);
    if(!resToken.idUser)throw new Error("invalid or modified token"); 
    if(!resToken.email)throw new Error("email not fond"); 
    const user = await userService.getUserById(resToken.idUser, "");
    if(!user)throw new Error("User Not fond");
    if(user.email != resToken.email)throw new Error("Invalid email")
    const u = userService.editUser({is_active:1},resToken.idUser)
    if (!u)throw new Error("failed to activate user")
    res.status(200).json({}); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
  
module.exports = {
  getAllUsers,
  getUserById,
  getUser,
  getCompleteUserById,
  addUser,
  editUser,
  disableUser,
  deleteUser,
  login,
  loginByGoogleId,
  confirmEmail
}

