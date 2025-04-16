const express = require('express');
const authrouter = express.Router();
const { register, login, getProfile, getAllUsers } = require('../controller/userController');

authrouter.post('/register', register);
authrouter.post('/login', login);
authrouter.get('/profile', getProfile);
authrouter.get('/', getAllUsers);

module.exports = authrouter;