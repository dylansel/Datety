const express = require('express');
const router = express.Router();
const pool = require('../connection'); 
const CRUD = require('../CRUDs/crud')


// Obtener todos los usuarios
router.get('/getAllEvent', async (req, res) => {
    try {
        const respuesta = await CRUD.getAll("event");
        res.status(200).json(respuesta);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Obtener un evento por ID
router.get('/getEventById/:id', async (req, res) => {
    try {
      const id = req.params.id; // Obtener el ID del usuario desde la ruta
      const result = await CRUD.getById("event", id); 
      if (result === null || Object.keys(result).length === 0) { // Si el usuario no existe
        res.status(404).json({ message: 'Event not found' });
        return;
      }
      res.status(200).json(result); 
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  

// Agregar un nuevo evento
router.post('/addEvent', async (req, res) => {
    try {
      const idUser = req.params.idUser; 
      const data = req.body; 
      const rEvet = await CRUD.add("event", data); 
      //es necesario cuando se crea un evento agregar la relacion en userevent
      const rUserEvent = await CRUD.add("userevent", {
        idUser,
        idEvent:rEvet
      }); 
      res.status(200).json({ id: rEvet});  
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  
// Editar un evento existente
router.put('/editEvent/:id', async (req, res) => {
  try {
    const id = req.params.id; 
    const data = req.body; 
    const result = await CRUD.edit("event", data, id); 
    if (result === 0) { // Si el evento no existe
        res.status(404).json({ message: 'Event not found' });
        return;
    }
    res.status(200).json({});
  }catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Eliminar un evento existente
router.delete('/deleteEvent/:id', async (req, res) => {
  try {
    const id = req.params.id; 
    const result = await CRUD.remove("event", id); 
    if (result === 0) { // Si el event no existe
        res.status(404).json({ message: 'Event not found' });
        return;
    }
    res.status(200).json({}); //confirmo que se guardo correctamente
  }catch(error){
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});





module.exports = router