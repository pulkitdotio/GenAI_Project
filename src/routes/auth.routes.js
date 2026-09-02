const express = require('express');
const authController = require('../controllers/auth.controller');

const authRouter = express.Router();

authRouter.post('/register', authController.registerUser);


authRouter.post('/login', authController.loginUser);

authRouter.get('/logout', authController.logoutUser);


module.exports = authRouter;