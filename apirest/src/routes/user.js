const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const {authMiddleware} = require('./authMiddleware')

/*
This file only contains routing, the code and logic behind each query is in the controller.
*/

// Get all users
router.get('/getAllUsers',authMiddleware ,userController.getAllUsers);

// Get a user by ID
router.get('/getUserById/:id',authMiddleware, userController.getUserById);

// Add a new user
router.post('/addUser', userController.addUser); //no necesita estar logeado

// Edit an existing user
router.patch('/editUser',authMiddleware, userController.editUser);

// Delete an existing user
router.delete('/deleteUser',authMiddleware, userController.deleteUser);

//especific routes

//Login
router.post('/login', userController.login); //no necesita estar logueado 
router.get('/encript/:text', userController.encript);
module.exports = router;



