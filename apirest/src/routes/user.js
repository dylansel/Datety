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


// Get a current user
router.get('/getUser',authMiddleware, userController.getUser);

// Add a new user
router.post('/addUser', userController.addUser); //no necesita estar logeado

// Edit an existing user
router.patch('/editUser',authMiddleware, userController.editUser);

// Delete an existing user
router.patch('/disableUser',authMiddleware, userController.disableUser); //Este se utiliza para "eliminar" usuarios, los desabilita permanentemente
router.delete('/deleteUser',authMiddleware, userController.deleteUser); //Esta para un futuro, pero no deberia ser utilizado por logica, en su lugar desabilitar usuarios

//especific routes

//Login
router.post('/login', userController.login); //no necesita estar logueado 
router.post('/loginByGoogleId', userController.loginByGoogleId); //no necesita estar logueado 

router.post('/confirmEmail/:token', userController.confirmEmail);
module.exports = router;

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9*eyJpZFVzZXIiOjksImVtYWlsIjoibWFsZXRlbDUyMEBtc2JhY2suY29tIiwiZGF0YSI6bnVsbCwiaWF0IjoxNjg5MTMxODQ4LCJleHAiOjE2ODkyMTgyNDh9*4Nq5zJcUBm6hD7sbIRG__K-VlSywmOJZ7-JdoDSYzXk


