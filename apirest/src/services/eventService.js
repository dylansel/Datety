const pool = require('../database/connection');
const CRUD = require('../services/crud');
const { operateDateTime, formatTime } = require('../utils/utils');

const getAllEvents = async (idUser) => {
    const [results, fields] = await pool.promise().query(`
      SELECT e.* FROM event e
      INNER JOIN userEvent ue ON e.idEvent = ue.idEvent
      WHERE ue.idUser = ? order by e.startDate;
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
    WHERE ue.idUser = ? AND DATE(e.startDate) = ? 
    ORDER BY e.startTime;
  `, [idUser, date]);
  return results;
}

const getEventsBetweenDates = async (idUser, dateA, dateB) => {
  const [results, fields] = await pool.promise().query(`
    SELECT e.* FROM event e
    INNER JOIN userEvent ue ON e.idEvent = ue.idEvent
    WHERE ue.idUser = ? AND DATE(e.startDate) BETWEEN ? AND ?
    ORDER BY e.startTime;
  `, [idUser, dateA, dateB]);
  return results;
}

const isAvailableDate = async (idUser, date, time, duration) => {
  const startTime = new Date(`${date}T${time}`)
  const endTime = operateDateTime(startTime,duration)
  const endTimeString = formatTime(endTime); // Sumar la duración en minutos al tiempo inicial para obtener la hora de finalización del evento.
  const [resultsSleep, fieldsSleep] = await pool.promise().query(`
  SELECT s.startSleep ,s.endSleep FROM settings s WHERE s.idUser = ? 
`, [idUser]);

  const startSleep = new Date (`${date}T${resultsSleep[0].startSleep}`) //SEGUIR DESDE ACA, EN CASO DE QUE STAERT SLEEP SEA MAYOR A 12, ENTONCES SE TIENE QUE PONER DATE COOMO EL DIA ANTERIOR
  const endSleep = new Date(`${date}T${resultsSleep[0].endSleep}`)
  
  console.log("startSleep:",formatTime(startSleep),startTime > startSleep)
  console.log("endSleep:",formatTime(endSleep),startTime < endSleep)
  console.log("startTime:",formatTime(startTime),endTime > startSleep)
  console.log("endTime:",formatTime(endTime),endTime < endSleep)
  if((startTime > startSleep && startTime < endSleep) || (endTime > startSleep && endTime < endSleep)) {
    return false
  }

  const [results, fields] = await pool.promise().query(`
    SELECT s.startSleep ,s.endSleep FROM event e
    INNER JOIN userEvent ue ON e.idEvent = ue.idEvent
    INNER JOIN settings s ON ue.idUser = s.idUser
    WHERE ue.idUser = ? AND e.startDate = ? AND 
    (
      (TIME(?) >= e.startTime AND TIME(?) < e.endTime) OR 
      (TIME(?) <= e.startTime AND TIME(?) > e.startTime) 
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
