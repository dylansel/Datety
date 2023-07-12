const pool = require('../database/connection');
const CRUD = require('../services/crud');

const getAllNotifications = async () => await CRUD.getAll('notification');

const getNotificationById = async (id) => await CRUD.getById('notification', id);

const addNotification = async (data) => await CRUD.add('notification', data);

const editNotification = async (data, id) => await CRUD.edit('notification', data, id);

const removeNotification = async (id) => await CRUD.remove('notification', id);

const getNotificationByColumn = async (column, value) => await CRUD.getByColumn('notification', column, value);

module.exports = {
  getAllNotifications,
  getNotificationById,
  getNotificationByColumn,
  addNotification,
  editNotification,
  removeNotification,
};
