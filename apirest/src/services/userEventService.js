const pool = require('../database/connection');
const CRUD = require('../services/crud');

const getAllUserEvents = async () => await CRUD.getAll("userevent");

const getUserEventById = async (id) => await CRUD.getById("userevent", id);

const addUserEvent = async (data) => await CRUD.add("userevent", data);

const editUserEvent = async (data, id) => await CRUD.edit("userevent", data, id);

const removeUserEvent = async (idEvent,idUser) => await CRUD.remove("userevent",null, {idEvent,idUser});

const getUserEventByColumn = async (column, value,extraClauses) => await CRUD.getByColumn("userevent", column, value,["*"],extraClauses);

module.exports = {
  getAllUserEvents,
  getUserEventById,
  getUserEventByColumn,
  addUserEvent,
  editUserEvent,
  removeUserEvent,
};
