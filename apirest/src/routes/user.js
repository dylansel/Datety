const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

/*
This file only contains routing, the code and logic behind each query is in the controller.
*/

// Get all users
router.get('/getAllUsers', userController.getAllUsers);

// Get a user by ID
router.get('/getUserById/:id', userController.getUserById);

// Add a new user
router.post('/addUser', userController.addUser);

// Edit an existing user
router.put('/editUser/:id', userController.editUser);

// Delete an existing user
router.delete('/deleteUser/:id', userController.deleteUser);

module.exports = router;



