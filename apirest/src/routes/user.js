const express = require('express');
const router = express.Router();
const pool = require('../connection'); 
const CRUD = require('../CRUDs/crud')


// Obtener todos los usuarios
router.get('/getAllUsers', async (req, res) => {
    try {
        const respuesta = await CRUD.getAll("user");
        res.status(200).json(respuesta);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Obtener un usuario por ID
router.get('/getUserById/:id', async (req, res) => {
    try {
      const id = req.params.id; // Obtener el ID del usuario desde la ruta
      const user = await CRUD.getById("user", id); 
      if (user === null || Object.keys(user).length === 0) { // Si el usuario no existe
        res.status(404).json({ message: 'User not found' });
        return;
      }
      res.status(200).json(user); 
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  

// Agregar un nuevo usuario
router.post('/addUser', async (req, res) => {
    try {
      const data = req.body; 
      const result = await CRUD.add("user", data); 
      res.status(200).json({ id: result });  
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  



module.exports = router