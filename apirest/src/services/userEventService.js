const pool = require('../database/connection');
const CRUD = require('../services/crud');

const getAllUserEvents = async () => await CRUD.getAll("userevent");

const getUserEventById = async (id) => await CRUD.getById("userevent", id);

const addUserEvent = async (data) => await CRUD.add("userevent", data);

const editUserEvent = async (data, id) => await CRUD.edit("userevent", data, id);

const removeUserEvent = async (idUser,id) => await CRUD.remove("userevent", id);

const getUserEventByColumn = async (column, value) => await CRUD.getByColumn("userevent", column, value);

module.exports = {
  getAllUserEvents,
  getUserEventById,
  getUserEventByColumn,
  addUserEvent,
  editUserEvent,
  removeUserEvent,
};
