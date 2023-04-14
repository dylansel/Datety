const express = require('express');
const router = express.Router();
const pool = require('../connection'); 

//function to convert the table name of a id table example user => idUser
function toId(table) {
  const t =  table.charAt(0).toUpperCase() + table.slice(1);
  return `id${t}`
}

/*
Los valores a las consultas no se concatenan en el query por que es una mala practica y vulnerable a inyeccion SQL, en su lugar se usa ? para datos y ?? para nombre de tablas o de campos 
*/

// get All generic for any table
const getAll =  async (table) => {
  const [results, fields] = await pool.promise().query(`SELECT * FROM ?? `,[table]); 
  return results
}

// get By Id generic for any table 
const getById = async (table, id) => {
  const [results, fields] = await pool.promise().query(`SELECT * FROM ?? WHERE ?? = ?`, [table,toId(table),id]);
  return results;
};

// add generic for any table 
const add = async (table, data) => {
  const [results, fields] = await pool.promise().query(`INSERT INTO ?? SET ?`, [table,data]);
  return results.insertId;
};

// edit generic for any table 
const edit = async (table, data, id) => {
  const [results, fields] = await pool.promise().query(`UPDATE ?? SET ? WHERE ?? = ?`, [table,data,toId(table) ,id]);
  return results.affectedRows;
};

// remove generic for any table 
const remove = async (table, id) => {
  const [results, fields] = await pool.promise().query(`DELETE FROM ?? WHERE ?? = ?`, [table,toId(table),id]);
  return results.affectedRows;
};


module.exports = {
  getAll,
  getById,
  add,
  edit,
  remove
};


/*
// Create a new user
const getAll =  async (table) => {

    try {
        const [results, fields] = await pool.promise().query(`SELECT * FROM ${table}`);
        return {
            results: results,
            err: null,
        }
    } catch (error) {
        console.error(error);
        return {
            results:null,
            err:error,
        }
    }
}
module.exports ={
    getAll
};


*/




/*
async function getAll(table){
    try {
        const [results, fields] = await pool.promise().query(`SELECT * FROM ${table}`);
        res.status(200).json(results);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}


router.post('/addUser', async (req, res) => {
    try {
        const { first_name, last_name, email, password } = req.body;
        const result = await pool.promise().query(
            'INSERT INTO user (first_name, last_name, email, password) VALUES (?, ?, ?, ?)',
            [first_name, last_name, email, password]
        );
        res.status(200).json({ message: 'User created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Read all users
router.get('/getAllUsers', async (req, res) => {
    try {
        const [results, fields] = await pool.promise().query('SELECT * FROM user');
        res.status(200).json(results);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Read a specific user by ID
router.get('/getUserById/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const [results, fields] = await pool.promise().query('SELECT * FROM user WHERE user_id = ?', [id]);
        if (results.length > 0) {
            res.status(200).json(results[0]);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Update a specific user by ID
router.put('/editUserById/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { first_name, last_name, email, password } = req.body;
        const result = await pool.promise().query(
            'UPDATE user SET first_name = ?, last_name = ?, email = ?, password = ? WHERE user_id = ?',
            [first_name, last_name, email, password, id]
        );
        if (result.affectedRows > 0) {
            res.status(200).json({ message: 'User updated successfully' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Delete a specific user by ID
router.delete('/deleteUser/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.promise().query('DELETE FROM user WHERE user_id = ?', [id]);
        if (result.affectedRows > 0) {
            res.status(200).json({ message: 'User deleted successfully' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
*/


