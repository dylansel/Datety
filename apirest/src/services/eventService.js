const pool = require('../database/connection');
const CRUD = require('../services/crud');
const { operateDateTime, getTime, formatDateToString, convertToArgTime } = require('../utils/utils');

const getAllEvents = async (idUser) => {
    const [results, fields] = await pool.promise().query(`
      SELECT e.* FROM event e
      INNER JOIN userEvent ue ON e.idEvent = ue.idEvent
      WHERE ue.idUser = ? order by e.startDateTime;
    `, [idUser]);
    return results;
}

const getEventById = async (idUser,id) => {
  const [results, fields] = await pool.promise().query(`
  SELECT e.* FROM event e
  INNER JOIN userEvent ue ON e.idEvent = ue.idEvent
  WHERE ue.idUser = ? and e.idEvent = ?;
`, [idUser,id]);
return results;
};

const addEvent = async (data) => await CRUD.add('event', data);

const editEvent = async (data, id) => await CRUD.edit('event', data, id);

const removeEvent = async (id) => await CRUD.remove('event', id);

const getEventByColumn = async (column, value) => await CRUD.getByColumn('event', column, value);

//Consultas especificas

const getEventsByDay = async (idUser, date) => {
  const [results, fields] = await pool.promise().query(`
    SELECT e.* FROM event e
    INNER JOIN userEvent ue ON e.idEvent = ue.idEvent
    WHERE ue.idUser = ? AND DATE(e.startDateTime) = ? 
    ORDER BY e.startTime;
  `, [idUser, date]);
  return results;
}

const getEventsBetweenDates = async (idUser, dateA, dateB) => {
  const [results, fields] = await pool.promise().query(`
    SELECT e.* FROM event e
    INNER JOIN userEvent ue ON e.idEvent = ue.idEvent
    WHERE ue.idUser = ? AND DATE(e.startDateTime) BETWEEN ? AND ?
    ORDER BY e.startTime;
  `, [idUser, dateA, dateB]);
  return results;
}

const isAvailableDate = async (idUser, dateTime, duration) => {
  const startTime = dateTime
  const date = formatDateToString(startTime)
  const time = getTime(startTime)
  const endTime = operateDateTime(startTime,duration) // Suma la duración en minutos al tiempo inicial para obtener la hora de finalización del evento.
  const endTimeString = getTime(endTime); 
  const [resultsSleep, fieldsSleep] = await pool.promise().query(`
  SELECT s.startSleep ,s.endSleep FROM settings s WHERE s.idUser = ? 
`, [idUser]);

  let startSleep = new Date (`${date}T${resultsSleep[0].startSleep}`) 
  let endSleep = new Date(`${date}T${resultsSleep[0].endSleep}`)

  const dateNooN = new Date(`${date}T16:00:00`)
  if(startSleep >= dateNooN && startTime <=dateNooN){
    startSleep = operateDateTime(startSleep,-1440); //En caso de que la hora de inicio del evento sea despues del mediodia y la hora de inicio de sueño tambien es pasado del mediodia, significa que empieza a dormir antes de las 00:00, entonces hay que tomar la hora de inicio con la fecha anterior
  }
  if(endSleep <= dateNooN && startTime >=dateNooN){
    endSleep = operateDateTime(endSleep,1440); ////En caso de que la hora de inicio del evento sea antes del mediodia y la hora de fin del sueño tambien es antes del mediodia, hay que sumarle 1 dia, para que tome la fecha correctamente
  }
  

  if((startTime > startSleep && startTime < endSleep) || (endTime > startSleep && endTime < endSleep)) {
    return false
  }


  const [results, fields] = await pool.promise().query(`
    SELECT s.startSleep ,s.endSleep FROM event e
    INNER JOIN userEvent ue ON e.idEvent = ue.idEvent
    INNER JOIN settings s ON ue.idUser = s.idUser
    WHERE ue.idUser = ? AND e.startDateTime = ? AND 
    (
      (TIME(?) >= TIME(e.startDateTime) AND TIME(?) < TIME(e.endDateTime)) OR 
      (TIME(?) <= TIME(e.startDateTime) AND TIME(?) > TIME(e.startDateTime)) 
    );
  `, [idUser, date, time, time,time, endTimeString]);
  
  return results.length === 0;
};



module.exports = {
  getAllEvents,
  getEventById,
  getEventByColumn,
  addEvent,
  editEvent,
  removeEvent,
  getEventsByDay,
  getEventsBetweenDates,
  isAvailableDate,
};
