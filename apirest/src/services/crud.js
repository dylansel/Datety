const pool = require('../database/connection'); 

//function to convert the table name of a id table example user => idUser
function toId(table) {
  const t =  table.charAt(0).toUpperCase() + table.slice(1);
  return `id${t}`
}

/*
Los valores a las consultas no se concatenan en el query por que es una mala practica 
y vulnerable a inyeccion SQL, en su lugar se usa ? para datos y ?? para nombre de tablas o de campos 
*/

// get All generic for any table
const getAll =  async (table) => {
  const [results, fields] = await pool.promise()
  .query(`SELECT * FROM ?? `,[table]); 
  return results
}

// get By Id generic for any table 
const getById = async (table, id) => {
  const [results, fields] = await pool.promise()
  .query(`SELECT * FROM ?? WHERE ?? = ?`, [table,toId(table),id]);
  return results;
};

// add generic for any table 
const add = async (table, data) => {
  const [results, fields] = await pool.promise()
  .query(`INSERT INTO ?? SET ?`, [table,data]);
  return results.insertId;
};

// edit generic for any table 
const edit = async (table, data, id) => {
  const [results, fields] = await pool.promise()
  .query(`UPDATE ?? SET ? WHERE ?? = ?`, [table,data,toId(table) ,id]);
  return results.affectedRows;
};

// remove generic for any table 
const remove = async (table, id) => {
  const [results, fields] = await pool.promise().query(`DELETE FROM ?? WHERE ?? = ?`, [table,toId(table),id]);
  return results.affectedRows;
};
//get by column generic for any table and any column
const getByColumn = async (table, column, value) => {
    const [results, fields] = await pool.promise()
      .query(`SELECT * FROM ?? WHERE ?? = ?`, [table, column, value]);
    return results;
  };
module.exports = {
  getAll,
  getById,
  add,
  edit,
  remove,
  getByColumn
};
