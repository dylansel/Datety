const pool = require('../database/connection');
const CRUD = require('../services/crud');

const getAllEvents = async (idUser) => {
    const [results, fields] = await pool.promise().query(`
      SELECT e.* FROM event e
      INNER JOIN userEvent ue ON e.idEvent = ue.idEvent
      WHERE ue.idUser = ?;
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

module.exports = {
  getAllEvents,
  getEventById,
  getEventByColumn,
  addEvent,
  editEvent,
  removeEvent,
};
