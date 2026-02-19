const pool = require('../database/connection');
const CRUD = require('../services/crud');

const getAllSettings = async () => await CRUD.getAll('settings');

const getSettingById = async (id) => await CRUD.getById('settings', id);

const addSetting = async (data) => await CRUD.add('settings', data);

const editSetting = async (data, id) => await CRUD.edit('settings', data, id);

const removeSetting = async (id) => await CRUD.remove('settings', id);

const getSettingByColumn = async (column, value) => await CRUD.getByColumn('settings', column, value);

module.exports = {
  getAllSettings,
  getSettingById,
  getSettingByColumn,
  addSetting,
  editSetting,
  removeSetting,
};
