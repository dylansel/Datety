
const eventService = require('../services/eventService')
const usereventService = require('../services/usereventService')
const getAllEvents = async (req,res) => {
  try {
    const respuesta = await eventService.getAllEvents();
    res.status(200).json(respuesta);
  }catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

const getEventById = async (req,res) => {
  try {
    const id = req.params.id; // Obtener el ID del usuario desde la ruta
    const result = await eventService.getEventById(id); 
    if (result === null || Object.keys(result).length === 0) { // Si el usuario no existe
      res.status(404).json({ message: 'Event not found' });
      return;
    }
    res.status(200).json(result); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

const addEvent = async (req, res) => {
  try {
    const idUser = req.params.idUser;
    //Validaciones de entrada
    if (!idUser || isNaN(idUser)) {
      return res.status(400).json({ message: 'Invalid user ID' });
    }
    const { tittle, description, startDate, endDate, startTime, endTime, isDinamic, isAccepted } = req.body;
    if (!tittle || !startDate || !endDate || !startTime || !endTime) {
      return res.status(400).json({ message: 'Missing event data' });
    }
    //Enviar la informacion
    const data = { tittle, description, startDate, endDate, startTime, endTime, isDinamic, isAccepted };
    const rEvet = await eventService.addEvent(data);
    if (!rEvet) {
      return res.status(500).json({ message: 'Internal server error' });
    }
    await usereventService.addUserEvent({
      idUser: idUser,
      idEvent: rEvet
    });
    res.status(200).json({ id: rEvet });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

const editEvent = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id || isNaN(id)) {
      return res.status(400).json({ message: 'Invalid event ID' });
    }

    const event = await eventService.getEventById(id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Crea un objeto que contiene solo los campos que se proporcionaron para actualizar
    let data = {};
    for (const prop in req.body) {
        data[prop] = req.body[prop];
    }
    const result = await eventService.editEvent(data, id);
    if (result === 0) {
      return res.status(500).json({ message: 'Failed to update event' });
    }
    res.status(200).json({});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

const deleteEvent = async (req,res) => {
  try {
    const id = req.params.id; 
    if(id!= null){
      //Para borrar definitivamente un evento, hay que eliminar las FK utilizadas en otras tablas. 
      //consulto todos las relaciones creadas entre event y User para borrarlas antes de borrar el evento.
      const userEvents = await usereventService.getUserEventByColumn('idEvent',id); //devuelve un array con los eventos
      console.log(userEvents);
      let deleteUserEvents = false;
      userEvents.forEach(async (el) =>  {
          await usereventService.removeUserEvent(el.idUserEvent)
      });
      const result = await eventService.removeEvent(id); 
      if (result === 0) { // Si el event no existe
          res.status(404).json({ message: 'Event not found' });
          return;
      }
    res.status(200).json({}); //confirmo que se guardo correctamente
    }
    
  }catch(error){
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = {
  getAllEvents,
  getEventById,
  addEvent,
  editEvent,
  deleteEvent,
}