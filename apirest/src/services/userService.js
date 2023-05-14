const pool = require('../database/connection');
const CRUD = require('../services/crud');

const getAllUsers = async () => await CRUD.getAll('user',["idUser","name","surname","email","userName","photo"]);

const getUserById = async (id) => await CRUD.getById('user',["idUser","name","surname","email","userName","photo"], id);

const addUser = async (data) => await CRUD.add('user', data);

const editUser = async (data, id) => await CRUD.edit('user', data, id);

const removeUser = async (id) => await CRUD.remove('user', id);

const getUserByColumn = async (column, value) => await CRUD.getByColumn('user',["idUser","name","surname","email","userName","photo"], column, value);

module.exports = {
  getAllUsers,
  getUserById,
  getUserByColumn,
  addUser,
  editUser,
  removeUser,
};
