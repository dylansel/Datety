const pool = require('../database/connection');
const CRUD = require('../services/crud');
const { operateDateTime, getTime, formatDateToString, convertToArgTime, formatDateTime } = require('../utils/utils');

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
    ORDER BY e.startDateTime;
  `, [idUser, date]);
  return results;
}

const getEventsBetweenDates = async (idUser, dateA, dateB) => {
  const [results, fields] = await pool.promise().query(`
    SELECT e.* FROM event e
    INNER JOIN userEvent ue ON e.idEvent = ue.idEvent
    WHERE ue.idUser = ? AND DATE(e.startDateTime) BETWEEN ? AND ?
    ORDER BY e.startDateTime;
  `, [idUser, dateA, dateB]);
  return results;
}

const isAvailableDate = async (idUser, startDateTime, duration) => {
  const date = formatDateToString(startDateTime)
  const time = getTime(startDateTime)
  const endDateTime = operateDateTime(startDateTime,duration) // Suma la duración en minutos al tiempo inicial para obtener la hora de finalización del evento.
  const endTimeString = getTime(endDateTime); 

  const [resultsSleep, fieldsSleep] = await pool.promise().query(`
  SELECT s.startSleep ,s.endSleep FROM settings s WHERE s.idUser = ? 
`, [idUser]);

  let startSleep = new Date (`${date}T${resultsSleep[0].startSleep}`) 
  let endSleep = new Date(`${date}T${resultsSleep[0].endSleep}`)

  const dateNooN = new Date(`${date}T16:00:00`)
  if(startSleep >= dateNooN && startDateTime <=dateNooN){
    startSleep = operateDateTime(startSleep,-1440); //En caso de que la hora de inicio del evento sea despues del mediodia y la hora de inicio de sueño tambien es pasado del mediodia, significa que empieza a dormir antes de las 00:00, entonces hay que tomar la hora de inicio con la fecha anterior
  }else if(startSleep <= dateNooN && startDateTime >=dateNooN){
    startSleep = operateDateTime(startSleep,1440);
  }
  if(endSleep <= dateNooN && startDateTime >=dateNooN){
    endSleep = operateDateTime(endSleep,1440); ////En caso de que la hora de inicio del evento sea antes del mediodia y la hora de fin del sueño tambien es antes del mediodia, hay que sumarle 1 dia, para que tome la fecha correctamente
  }
  

  if((startDateTime > startSleep && startDateTime < endSleep) || (endDateTime > startSleep && endDateTime < endSleep)) {
    return false
  }


  const [results, fields] = await pool.promise().query(`
    SELECT e.startDateTime ,e.endDateTime FROM event e
    INNER JOIN userEvent ue ON e.idEvent = ue.idEvent
    WHERE ue.idUser = ? AND 
    (
      ( e.startDateTime BETWEEN ? AND ? ) OR 
      (e.endDateTime BETWEEN ? AND ? ) OR
      (? BETWEEN e.startDateTime AND e.endDateTime ) OR
      (? BETWEEN e.startDateTime AND e.endDateTime ) 
    );
  `, [idUser, startDateTime, endDateTime,startDateTime, endDateTime,startDateTime,endDateTime]);

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
