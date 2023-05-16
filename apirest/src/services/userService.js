const pool = require('../database/connection');
const CRUD = require('../services/crud');

const getAllUsers = async () => await CRUD.getAll('user',["idUser","name","surname","email","userName","photo"],"WHERE is_active = 1");

const getUserById = async (id,extraClauses = "WHERE is_active = 1") => await CRUD.getById('user',id,["idUser","name","surname","email","userName","photo"],extraClauses);

const addUser = async (data) => await CRUD.add('user', data);

const editUser = async (data, id) => await CRUD.edit('user', data, id);

const removeUser = async (id) => await CRUD.remove('user', id);

const getUserByColumn = async (column, value,extraClauses = "WHERE is_active = 1") => await CRUD.getByColumn('user', column, value, ["idUser","name","surname","email","userName","photo"], extraClauses);

module.exports = {
  getAllUsers,
  getUserById,
  getUserByColumn,
  addUser,
  editUser,
  removeUser,
};
