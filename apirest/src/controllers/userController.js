const CRUD = require('../services/crud')
const userService = require('../services/userService')
const utils = require('../controllers/utils')
const bcrypt = require('bcryptjs');

const getAllUsers = async (req,res) => {
  try {
    const respuesta = await userService.getAllUsers();
    res.status(200).json(respuesta);
  }catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

const getUserById = async (req,res) => {
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

const addUser = async (req, res) => {
  try {
    const data = req.body;

    // Verificar si el email ya está registrado
    const emailExists = await userService.getUserByColumn('email', data.email);
    if (emailExists.length) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Verificar si el nombre de usuario ya está en uso
    const userNameExists = await userService.getUserByColumn("userName", data.userName);
    if (userNameExists.length) {
      return res.status(400).json({ message: 'Username already taken' });
    }

    // Agregar usuario
    const result = await userService.addUser(data);
    res.status(200).json({ id: result });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const editUser = async (req,res) => {
  try {
    const id = req.params.id; // Obtener el ID del usuario desde la ruta
    
    // Obtener el usuario por ID
    const user = await userService.getUserById(id);

    // Validar si el usuario existe
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Crea un objeto que contiene solo los campos que se proporcionaron para actualizar
    let data = {};
    for (const prop in req.body) {
        data[prop] = req.body[prop];
    }

    const result = await userService.editUser(data, id); // Editar el usuario utilizando la función edit de CRUD
    if (result === 0) { // Si el usuario no existe
      res.status(404).json({ message: 'User not found' });
      return;
    }
    res.status(200).json({});
  }catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

const deleteUser = async (req,res) => {
  try {
    const id = req.params.id; // Obtener el ID del usuario desde la ruta
    const result = await CRUD.remove("user", id); // Eliminar el usuario utilizando la función remove de CRUD
    if (result === 0) { // Si el usuario no existe
      res.status(404).json({ message: 'User not found' });
      return;
    }
    res.status(200).json({}); //confirmo que se guardo correctamente
  }catch(error){
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

//Funciones especificas

const loginUserName = async (req,res) => {
  try {
    const userName = req.body.userName; // Obtener el nombre de usuario desde la ruta
    const password = req.body.password; // Obtener el nombre de usuario desde la ruta
    const user = await userService.getUserByColumn("userName",userName);  
    if (!(utils.isExist(user))){res.status(404).json({ message: 'User not found' });return;};
    
    const isMatch = await utils.hashCompare(password, user[0].password);
    if (!isMatch) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }
    res.status(200).json({"idUser":user[0].idUser});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

const loginUserEmail = async (req,res) => {
  try {
    const userEmail = req.body.userEmail; // Obtener el nombre de usuario desde el body
    const password = req.body.password; 
    const user = await userService.getUserByColumn("email",userEmail);  
    if (!(utils.isExist(user))){res.status(404).json({ message: 'User not found' });return;};
    const isMatch = await utils.hashCompare(password, user[0].password);

    if (!isMatch) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }
    res.status(200).json({"idUser":user[0].idUser});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

const encript = async (req,res) => {
  try {
    const hash = await utils.encryptText(req.params.text);
    res.status(200).json(hash); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
  




module.exports = {
  getAllUsers,
  getUserById,
  addUser,
  editUser,
  deleteUser,
  loginUserName,
  loginUserEmail,
  encript
}

