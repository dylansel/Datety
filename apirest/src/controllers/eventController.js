const CRUD = require('../services/CRUDs/crud')


const getAllEvents = async (req,res) => {
  try {
    const respuesta = await CRUD.getAll("event");
    res.status(200).json(respuesta);
  }catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

const getEventById = async (req,res) => {
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
    const rEvet = await CRUD.add("event", data);
    if (!rEvet) {
      return res.status(500).json({ message: 'Internal server error' });
    }
    await CRUD.add("userevent", {
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

    const event = await CRUD.getById("event", id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Crea un objeto que contiene solo los campos que se proporcionaron para actualizar
    let data = {};
    for (const prop in req.body) {
        data[prop] = req.body[prop];
    }
    const result = await CRUD.edit("event", data, id);
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
      const result = await CRUD.remove("event", id); 
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