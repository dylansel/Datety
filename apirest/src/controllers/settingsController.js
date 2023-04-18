const CRUD = require('../services/CRUDs/crud')

const getAllsettings = async (req, res) => {
    try {
        const respuesta = await CRUD.getAll("user");
        res.status(200).json(respuesta);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const getUserById = async (req, res) => {
    try {
        const id = req.params.id; // Obtener el ID del usuario desde la ruta
        const user = await CRUD.getById("user", id);
        if (user === null || Object.keys(user).length === 0) { // Si el usuario no existe
            res.status(404).json({ message: 'User not found' });
            return;
        }
        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const addUser = async (req, res) => {
    try {
        const data = req.body;

        // Verificar si el email ya está registrado
        const emailExists = await CRUD.getByColumn('user', 'email', data.email);
        if (emailExists.length) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        // Verificar si el nombre de usuario ya está en uso
        const userNameExists = await CRUD.getByColumn("user", "userName", data.userName);
        if (userNameExists.length) {
            return res.status(400).json({ message: 'Username already taken' });
        }

        // Agregar usuario
        const result = await CRUD.add("user", data);
        res.status(200).json({ id: result });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const editUser = async (req, res) => {
    try {
        const id = req.params.id; // Obtener el ID del usuario desde la ruta

        // Obtener el usuario por ID
        const user = await CRUD.getById('user', id);

        // Validar si el usuario existe
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Crea un objeto que contiene solo los campos que se proporcionaron para actualizar
        let data = {};
        for (const prop in req.body) {
            data[prop] = req.body[prop];
        }

        const result = await CRUD.edit('user', data, id); // Editar el usuario utilizando la función edit de CRUD
        if (result === 0) { // Si el usuario no existe
            res.status(404).json({ message: 'User not found' });
            return;
        }
        res.status(200).json({});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const deleteUser = async (req, res) => {
    try {
        const id = req.params.id; // Obtener el ID del usuario desde la ruta
        const result = await CRUD.remove("user", id); // Eliminar el usuario utilizando la función remove de CRUD
        if (result === 0) { // Si el usuario no existe
            res.status(404).json({ message: 'User not found' });
            return;
        }
        res.status(200).json({}); //confirmo que se guardo correctamente
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = {
    getAllUsers,
    getUserById,
    addUser,
    editUser,
    deleteUser,
}