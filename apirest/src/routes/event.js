const express = require('express');
const router = express.Router();
const pool = require('../database/connection'); 
const CRUD = require('../services/CRUDs/crud')
const eventController = require('../controllers/eventController')

// Obtener todos los usuarios
router.get('/:idUser/getAllEvents', eventController.getAllEvents);

// Obtener un evento por ID
router.get('/:idUser/getEventById/:id', eventController.getEventById);
  
// Agregar un nuevo evento
router.post('/:idUser/addEvent', eventController.addEvent);
  
// Editar un evento existente
router.patch('/:idUser/editEvent/:id', eventController.editEvent);

// Eliminar un evento existente
router.delete('/:idUser/deleteEvent/:id', eventController.deleteEvent);

module.exports = router