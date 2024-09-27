const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Render the login page
router.get('/login', (req, res) => {
  res.render('login'); // Make sure you have a login.ejs file in your views directory
});

// User registration route
router.post('/register', userController.register);

// User login route
router.post('/login', userController.login);

// User logout route
router.get('/logout', userController.logout);

module.exports = router;
