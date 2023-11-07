const pool = require('../database/connection');
const CRUD = require('../services/crud');

const getAllUsers = async () => await CRUD.getAll('user',["idUser","name","surname","email","userName","photo"],"WHERE is_active = 1");

const getUserById = async (id,extraClauses = "WHERE is_active = 1") => await CRUD.getById('user',id,["idUser","name","surname","email","userName","photo"],extraClauses);

const addUser = async (data) => await CRUD.add('user', data);

const editUser = async (data, id) => await CRUD.edit('user', data, id);

const removeUser = async (id) => await CRUD.remove('user', id);

const getUserByColumn = async (column, value,extraClauses = "WHERE is_active = 1",fields = ["idUser","name","surname","email","userName","photo"]) => await CRUD.getByColumn('user', column, value, fields, extraClauses);

const getCompleteUserById = async (id)=>{
  let sql = `SELECT u.idUser, u.name,u.surname,u.email,u.userName,u.photo, s.darkTheme, s.startSleep, s.endSleep FROM user as u INNER JOIN settings as s ON s.idUser = u.idUser WHERE u.idUser = ? and u.is_active = 1`;
  let params = [id];
  const [results, fields] = await pool.promise().query(sql, params);
  return results[0];
}



module.exports = {
  getAllUsers,
  getUserById,
  getUserByColumn,
  addUser,
  editUser,
  removeUser,
  getCompleteUserById,
};
