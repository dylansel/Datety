const pool = require('../database/connection');
const CRUD = require('../services/crud');

const getAllEvents = async () => await CRUD.getAll('event');

const getEventById = async (id) => await CRUD.getById('event', id);

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
