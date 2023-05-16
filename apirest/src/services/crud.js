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
const getAll = async (table, selectFields = ['*'], extraClauses = null) => {
  let sql = `SELECT ${selectFields.join(', ')} FROM ??`;
  let params = [table];

  if (extraClauses) {
    sql += ` ${extraClauses}`;
  }
  //aca estoy usando ${} en la consutla, pero no es una mala opractica por que no es un dto ingresado por el usuario sino interno de la api
  const [results, fields] = await pool.promise().query(sql, params);
  return results;
};

// get By Id generic for any table 
const getById = async (table, id, selectFields = ['*'], extraClauses = null) => {
  let sql = `SELECT ${selectFields.join(', ')} FROM ?? WHERE ?? = ?`;
  let params = [table, toId(table), id];

  if (extraClauses) {
    if (extraClauses.includes('WHERE')) {
      sql += ` AND ${extraClauses.replace('WHERE', '')}`;
    } else {
      sql += ` ${extraClauses}`;
    }
  }

  const [results, fields] = await pool.promise().query(sql, params);
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
const remove = async (table, id, where = null) => {
  let sql = 'DELETE FROM ??';
  const params = [table];

  if (id) {
    sql += ' WHERE ?? = ?';
    params.push(toId(table), id);
  }

  if (where) {
    const whereKeys = Object.keys(where);

    if (whereKeys.length) {
      sql += id ? ' AND ' : ' WHERE ';
      sql += whereKeys.map((key) => {
        params.push(key, where[key]);
        return `?? = ?`;
      }).join(' AND ');
    }
  }

  const [result] = await pool.promise().query(sql, params);
  return result.affectedRows;
};

//get by column generic for any table and any column
const getByColumn = async (table, column, value, selectFields = ['*'], extraClauses = null) => {
  let sql = `SELECT ${selectFields.join(', ')} FROM ?? WHERE ?? = ?`;
  let params = [table, column, value];

  if (extraClauses) {
    if (extraClauses.includes('WHERE')) {
      sql += ` AND ${extraClauses.replace('WHERE', '')}`;
    } else {
      sql += ` ${extraClauses}`;
    }
  }

  const [results, fields] = await pool.promise().query(sql, params);
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
