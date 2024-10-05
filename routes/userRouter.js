const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');

// User routes
router.get('/', userController.home);
router.get('/userhomepage', userController.userhome);
router.get('/login', userController.login); // Login page
router.post('/login', userController.loginUser); // Login logic

// Registration routes
router.get('/register', userController.register);
router.post('/register', userController.registerUser);

// Logout route
router.post('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.redirect('/userhomepage'); // Handle error if needed
        }
        res.redirect('/'); // Redirect to homepage after logout
    });
});

module.exports = router;
