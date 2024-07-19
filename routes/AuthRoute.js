const express = require('express');
const AuthController = require('../controllers/AuthController');
const router = express.Router()

// Create User Route
router.post('/users/create', AuthController.createUser);

// list
router.get('/users/list', AuthController.list);

module.exports = router;