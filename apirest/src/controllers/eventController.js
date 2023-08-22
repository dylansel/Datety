const eventService = require("../services/eventService");
const usereventService = require("../services/usereventService");
const utils = require("../utils/utils");
const { getTime, formatDateToString } = require("../utils/utils");
const seedrandom = require('seedrandom'); // Importa la biblioteca seedrandom

const {
  sendEventInvitation,
  sendConfirmEmail,
} = require("../utils/emeilSendUtils");

const getAllEvents = async (req, res) => {
  try {
    const idUser = req.user.idUser;
    const respuesta = await eventService.getAllEvents(idUser);
    res.status(200).json(respuesta);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getEventById = async (req, res) => {
  try {
    const idUser = req.user.idUser; // Obtener el ID del usuario desde el auth
    const id = req.params.id; // Obtener el ID del evento desde la ruta
    const result = await eventService.getEventById(idUser, id);
    if (result === null || Object.keys(result).length === 0) {
      // Si el evento no existe
      res.status(404).json({ message: "Event not found or not accessible" });
      return;
    }
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};


const getPossibleAvailableDates = async (req, res) => {
  try {
    const MAX_OPTIONS_TO_RETURN = 10; // Define la cantidad máxima de opciones a devolver
    const { participants, duration,randomnessSeed } = req.body;
    const options = await getPossiblesDates(participants, duration, 150);

    // Ordena las opciones por fecha de inicio
    const minIntervalMinutes = 60; // Intervalo mínimo en minutos entre las fechas seleccionadas
    const selectedOptions = [options[0]]; // Empieza con la primera opción

    for (let i = 1; i < options.length; i++) {
      if (selectedOptions.length >= MAX_OPTIONS_TO_RETURN) {
        break; // Detener si ya hemos seleccionado suficientes opciones
      }

      const prevEndDateTime = new Date(selectedOptions[selectedOptions.length - 1].endDateTime);
      const currentStartDateTime = new Date(options[i].startDateTime);

      // Si la diferencia en minutos es mayor que el intervalo mínimo, agrega la opción
      if ((currentStartDateTime - prevEndDateTime) / (1000 * 60) >= minIntervalMinutes) {
        selectedOptions.push(options[i]);
      }
    }

    const optionsToShow = selectedOptions.map((el) => {
      const dateS = new Date(el.startDateTime);
      const dateE = new Date(el.endDateTime);
      const obj = {
        startDateTime: `${formatDateToString(dateS)}T${getTime(dateS)}`,
        endDateTime: `${formatDateToString(dateE)}T${getTime(dateE)}`,
      };
      return obj;
    });

    res.status(200).json(optionsToShow);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const addEvent = async (req, res) => {
  try {
    const idUser = req.user.idUser;
    //Validaciones de entrada
    if (!idUser || isNaN(idUser)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }
    const {
      tittle,
      description,
      startDateTime,
      endDateTime,
      repeat,
      isDinamic,
      participants,
    } = req.body;
    if (!tittle || !startDateTime || !endDateTime) {
      return res.status(400).json({ message: "Missing event data" });
    }
    const startDateTimeDATE = new Date(startDateTime);
    const endDateTimeDATE = new Date(endDateTime);

    if (isDinamic && !repeat) {
      //codigo para crear dinamicamente, para muchos usuarios
      //evento dinamico no se repite.

      return res.status(400).json("TODAVIA NO FUNCIONANDO");
      if (participants.length >= 1) {
        //agregar el evento y todos los participantes
      }
    }

    if (repeat && !isDinamic) {
      //Crear un evento
      const startDate = formatDateToString(startDateTimeDATE);
      const startTime = getTime(startDateTimeDATE);
      const endTime = getTime(endDateTimeDATE);
      console.log("startDate:", startDate);
      console.log("startTime:", startTime);
      console.log("endTime:", endTime);
      let respsDates = [startDate];
      if (repeat.rep && !repeat.for) {
        respsDates = utils.listDateInWeekUntil(
          startDate,
          repeat.until,
          repeat.rep
        );
      } else if (repeat.for == "month") {
        respsDates = utils.listDateInNumberUntil(
          startDate,
          repeat.until,
          startDate.split("-")[2]
        );
      } else if (repeat.for == "year") {
        respsDates = utils.listDateInYearUntil(startDate, repeat.until);
      }
      if (respsDates.length == 0) respsDates = [startDate];

      respsDates.forEach(async (dateDinamic) => {
        console.log("FECHA INICIO:", `${dateDinamic}T${startTime}`);
        console.log("FECHA FIN:", `${dateDinamic}T${endTime}`);
        const startDateTime = new Date(`${dateDinamic}T${startTime}`);
        const endDateTime = new Date(`${dateDinamic}T${endTime}`);
        const data = {
          tittle,
          description,
          startDateTime: startDateTime,
          endDateTime: endDateTime,
          isDinamic: 0,
          isAccepted: 1,
        };
        console.log(data);
        const rEvet = await eventService.addEvent(data);
        if (!rEvet) {
          return res.status(500).json({ message: "Internal server error" });
        }
        await usereventService.addUserEvent({
          idUser: idUser,
          idEvent: rEvet,
        });
      });
      const event = {
        tittle,
        description,
        startDateTime,
        endDateTime,
        repeat,
        isDinamic,
        participants,
      };
      sendEventInvitation(idUser, event);
      return res.status(200).json({});
    }
    res
      .status(400)
      .json({ message: "could not add the event, check the data" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const editEvent = async (req, res) => {
  try {
    const idUser = req.user.idUser;
    const id = req.params.id;

    if (!id || isNaN(id)) {
      return res.status(400).json({ message: "Invalid event ID" });
    }
    const event = await eventService.getEventById(idUser, id);
    if (!utils.isExist(event)) {
      return res
        .status(404)
        .json({ message: "Event not found or not authorized" });
    }
    // Crea un objeto que contiene solo los campos que se proporcionaron para actualizar
    let data = {};
    for (const prop in req.body) {
      data[prop] = req.body[prop];
    }
    const result = await eventService.editEvent(data, id);
    if (result === 0) {
      return res.status(500).json({ message: "Failed to update event" });
    }
    res.status(200).json({});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteEvent = async (req, res) => {
  try {
    const idUser = req.user.idUser;
    const id = req.params.id;
    if (id != null) {
      //Para borrar definitivamente un evento, hay que eliminar las FK utilizadas en otras tablas.

      //borrar userevent
      //consulto todos las relaciones creadas entre event y User. en caso de ser mas de 1, solo voy a borrar la relacion, sino borro todo el evento
      let result = await usereventService.removeUserEvent(id, idUser);
      const userEvents = await usereventService.getUserEventByColumn(
        "idEvent",
        id
      ); //devuelve un array con los las relaciones
      console.log(userEvents);
      console.log("result de userevent:" + result);
      if (userEvents.length == 0 && result) {
        // //eliminar notificaciones relacionadas al evento TODAVIA NO IMPLEMENTADO
        // const notifications = await notificationService.getNotificationByColumn('idEvent', id);
        // notifications.forEach(async (notification) => {
        //   await notificationService.removeNotification(notification.id);
        // });

        result = await eventService.removeEvent(id);
        console.log(id);
      }
      console.log("result evento eliminado: " + result);
      if (!result) {
        // Si el event no existe
        res.status(404).json({ message: "Event not found or not authorized" });
        return;
      }
      res.status(200).json({}); //confirmo que se elimino correctamente
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//FUNCIONES ESPECIFICAS

const getEventsForWeek = async (req, res) => {
  try {
    const idUser = req.user.idUser;
    const dateparam = req.params.date;
    const date =
      new Date(dateparam) != "Invalid Date" ? new Date(dateparam) : new Date();

    if (!date) return res.status(400).json({ message: "Invalid date" });
    const curr = utils.operateDate(new Date(date), +1);
    let week = [];
    for (let index = 0; index < 7; index++) {
      const day = new Date(
        curr.setDate(curr.getDate() - curr.getDay() + index)
      );
      const dayString = utils.formatDateToString(day, "YYYY-MM-DD");
      const respuesta = await eventService.getEventsByDay(idUser, dayString);

      week.push(...respuesta);
    }
    res.status(200).json(week);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
const getEventsForMonth = async (req, res) => {
  try {
    const idUser = req.user.idUser;
    const dateparam = req.params.date;
    const date =
      new Date(dateparam) != "Invalid Date" ? new Date(dateparam) : new Date();

    const curr = utils.operateDate(date, +1);
    const year = curr.getFullYear();
    const monthIndex = curr.getMonth();
    const startDate = new Date(year, monthIndex, 1);
    const endDate = new Date(year, monthIndex + 1, 0);

    const monthEvents = await eventService.getEventsBetweenDates(
      idUser,
      startDate,
      endDate
    );
    res.status(200).json(monthEvents);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getEventsForYear = async (req, res) => {
  try {
    const idUser = req.user.idUser;
    const dateparam = req.params.date;
    const date =
      new Date(dateparam) != "Invalid Date" ? new Date(dateparam) : new Date();
    let year = date.getFullYear().toString();

    if (!year) return res.status(400).json({ message: "Invalid year" });

    const startDate = new Date(year, 0, 1);
    const endDate = new Date(year, 11, 31);

    const yearEvents = await eventService.getEventsBetweenDates(
      idUser,
      startDate,
      endDate
    );
    res.status(200).json(yearEvents);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getPossiblesDates = async (users, duration, amount) => {
  const now = utils.roundToNextHour(new Date());

  let date = utils.operateDateTime(now, 10);
  const options = [];
  while (options.length < amount) {
    const endDataTime = utils.operateDateTime(date, duration);
    if (endDataTime > date) {
      const isAvailable = await eventService.isAvailableDate(
        users[0].idUser,
        date,
        duration
      );
      if (typeof isAvailable === 'boolean' && isAvailable===true) { //si isAviable no retorna una fecha, significa que retorno un true, osea que esta disponible
        let isOption = true;
        for (let i = 1; i < users.length; i++) {
          const isAvailableGuests = await eventService.isAvailableDate(
            users[i].idUser,
            date,
            duration
          );
          if (isAvailableGuests===true) {
            isOption = true;
          } else {
            isOption = false;
            break;
          }
        }

        if (isOption) {
          options.push({ startDateTime: date, endDateTime: endDataTime });
          date = utils.operateDateTime(date, 20); //le sumo 20 minutos para que no esten pegados las sugerencias y sea diferentes alternativas
        }
      }else{
        //en caso contrario, osea que no este disponible, va a setear la fecha date como la fecha que devuelva, ya que seria la fecha de finalizacion del evento que esta ocupando la agenda
        date = isAvailable;
        
      }
    }
    date = utils.operateDateTime(date, 10);
    
  }
  return options;
};

module.exports = {
  getAllEvents,
  getEventById,
  addEvent,
  editEvent,
  deleteEvent,
  getEventsForWeek,
  getEventsForMonth,
  getEventsForYear,
  getPossibleAvailableDates,
};
