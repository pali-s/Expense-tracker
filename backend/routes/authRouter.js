const express = require('express');
const authrouter = express.Router();
const { register, login, getProfile, getAllUsers } = require('../controller/userController');
const { protect } = require('../middlewares/authMiddleware');

authrouter.post('/register', register);
authrouter.post('/login', login);
authrouter.get('/profile',protect,getProfile);
authrouter.get('/', protect ,getAllUsers);

module.exports = authrouter;