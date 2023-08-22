const express = require('express');
const router = express.Router();
const pool = require('../database/connection'); 
const eventController = require('../controllers/eventController')

// Obtener todos los eventos
router.get('/getAllEvents', eventController.getAllEvents);

// Obtener todos los eventos de una semana
router.get('/getEventsForWeek/:date?', eventController.getEventsForWeek);

// Obtener todos los eventos de un mes
router.get('/getEventsForMonth/:date?', eventController.getEventsForMonth);

// Obtener todos los eventos de un año
router.get('/getEventsForYear/:date?', eventController.getEventsForYear);

// Obtener un evento por ID
router.get('/getEventById/:id', eventController.getEventById);
  
// Agregar un nuevo evento
router.post('/addEvent', eventController.addEvent);
  
// Editar un evento existente
router.patch('/editEvent/:id', eventController.editEvent);

// Eliminar un evento existente
router.delete('/deleteEvent/:id', eventController.deleteEvent);

//rutas mas especificas
router.get('/getPossibleAvailableDates', eventController.getPossibleAvailableDates);

module.exports = router