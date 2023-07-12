
const eventService = require('../services/eventService')
const usereventService = require('../services/usereventService')
const utils = require('../utils/utils');
const {sendEventInvitation, sendConfirmEmail } = require('../utils/emeilSendUtils');

const getAllEvents = async (req,res) => {
  try {
    const idUser = req.user.idUser;
    const respuesta = await eventService.getAllEvents(idUser);
    res.status(200).json(respuesta);
  }catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

const getEventById = async (req,res) => {
  try {
    const idUser = req.user.idUser; // Obtener el ID del usuario desde el auth
    const id = req.params.id; // Obtener el ID del evento desde la ruta
    const result = await eventService.getEventById(idUser,id); 
    if (result === null || Object.keys(result).length === 0) { // Si el evento no existe
      res.status(404).json({ message: 'Event not found or not accessible' });
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
    const idUser = req.user.idUser;
    //Validaciones de entrada
    if (!idUser || isNaN(idUser)) {
      return res.status(400).json({ message: 'Invalid user ID' });
    }
    const { tittle, description, startDate, endDate, startTime, endTime,repeat, isDinamic, participants } = req.body;
    if (!tittle || !startDate || !endDate || !startTime || !endTime) {
      return res.status(400).json({ message: 'Missing event data' });
    }
    if ( isDinamic && !repeat) {
      //codigo para crear dinamicamente, para muchos usuarios 
      //evento dinamico no se repite. 
      return res.status(400).json({ message: 'Todavia no habilitado este endpoint dinamico' });
      if(participants.length>=1 ){
      //agregar el evento y todos los participantes
      
      }

    }

    

    if(repeat && !isDinamic){
      //Crear un evento
      console.log("repeat")
      let respsDates = [startDate];
      if(repeat.rep && !repeat.for){
        respsDates = utils.listDateInWeekUntil(startDate,repeat.until,repeat.rep)
      }else if(repeat.for == "month"){
        respsDates = utils.listDateInNumberUntil(startDate,repeat.until,startDate.split('-')[2])
      }else if(repeat.for == "year"){
        respsDates = utils.listDateInYearUntil(startDate,repeat.until)
      }
      if(respsDates.length ==0)respsDates = [startDate];
      
      respsDates.forEach(async (dateDinamic) => {
        const data = { tittle, description, startDate:dateDinamic, endDate:dateDinamic, startTime, endTime, isDinamic:0, isAccepted:1 };
        const rEvet = await eventService.addEvent(data);
        if (!rEvet) {
          return res.status(500).json({ message: 'Internal server error' });
        }
        await usereventService.addUserEvent({
          idUser: idUser,
          idEvent: rEvet
        });
      }); 
      const event = {tittle, description, startDate, endDate, startTime, endTime,repeat, isDinamic, participants}
      sendEventInvitation(idUser,event);
      return res.status(200).json({});
      
    }
    res.status(400).json({ message: 'could not add the event, check the data' });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

const editEvent = async (req, res) => {
  try {
    const idUser = req.user.idUser;
    const id = req.params.id;
    if (!id || isNaN(id)) {
      return res.status(400).json({ message: 'Invalid event ID' });
    }
    const event = await eventService.getEventById(idUser,id);
    if (!utils.isExist(event)) {
      return res.status(404).json({ message: 'Event not found or not authorized' });
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

const deleteEvent = async (req, res) => {
  try {
    const idUser = req.user.idUser;
    const id = req.params.id;
    if (id != null) {
      //Para borrar definitivamente un evento, hay que eliminar las FK utilizadas en otras tablas.

      //borrar userevent
      //consulto todos las relaciones creadas entre event y User. en caso de ser mas de 1, solo voy a borrar la relacion, sino borro todo el evento
      let result = await usereventService.removeUserEvent(id, idUser)
      const userEvents = await usereventService.getUserEventByColumn('idEvent', id); //devuelve un array con los las relaciones
      console.log(userEvents);
      console.log("result de userevent:" + result);
      if (userEvents.length == 0 && result) {

        // //eliminar notificaciones relacionadas al evento TODAVIA NO IMPLEMENTADO
        // const notifications = await notificationService.getNotificationByColumn('idEvent', id);
        // notifications.forEach(async (notification) => {
        //   await notificationService.removeNotification(notification.id);
        // });

        result = await eventService.removeEvent(id);
        console.log(id)
      }
      console.log("result evento eliminado: " + result);
      if (!result) { // Si el event no existe
        res.status(404).json({ message: 'Event not found or not authorized' });
        return;
      }
      res.status(200).json({}); //confirmo que se elimino correctamente
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


//FUNCIONES ESPECIFICAS

const getEventsForWeek = async (req,res) => {
  try {
    const idUser = req.user.idUser;
    const dateparam = req.params.date;
    const date = (new Date(dateparam) != "Invalid Date")? new Date(dateparam) : new Date();

    if(!date)return res.status(400).json({ message: 'Invalid date'});
    const curr = utils.operateDate(new Date(date),+1) ;
    let week = [];
    for (let index = 0; index < 7; index++) {
      const day = new Date(curr.setDate(curr.getDate() - curr.getDay()+index))
      const dayString = utils.formatDateToString(day,'YYYY-MM-DD');
      const respuesta = await eventService.getEventsByDay(idUser,dayString);
    
      week.push(...respuesta)
    }
    res.status(200).json(week);
  }catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
const getEventsForMonth = async (req, res) => {
  try {
    const idUser = req.user.idUser;
    const dateparam = req.params.date;
    const date = (new Date(dateparam) != "Invalid Date")? new Date(dateparam) : new Date();
    console.log(date)

    const curr = utils.operateDate(date, +1);
    const year = curr.getFullYear();
    const monthIndex = curr.getMonth();
    const startDate = new Date(year, monthIndex, 1);
    const endDate = new Date(year, monthIndex + 1, 0);

    const monthEvents = await eventService.getEventsBetweenDates(idUser, startDate, endDate);
    res.status(200).json(monthEvents);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

const getEventsForYear = async (req, res) => {
  try {
    const idUser = req.user.idUser;
    const dateparam = req.params.date;
    const date = (new Date(dateparam) != "Invalid Date")? new Date(dateparam) : new Date();
    let year = date.getFullYear().toString();
    
    if (!year) return res.status(400).json({ message: 'Invalid year' });

    const startDate = new Date(year, 0, 1);
    const endDate = new Date(year, 11, 31);

    const yearEvents = await eventService.getEventsBetweenDates(idUser, startDate, endDate);
    res.status(200).json(yearEvents);
  } catch (error) {
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
  getEventsForWeek,
  getEventsForMonth,
  getEventsForYear,
}