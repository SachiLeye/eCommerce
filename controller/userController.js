const User = require('../models/User');
const bcrypt = require('bcryptjs');

const ph = {
    home: (req, res) => {
        res.render('homepage');
    },
    login: (req, res) => {
        res.render('login', { error: null, email: '' });
    },
    register: (req, res) => {
        res.render('register');
    },
    userhome: (req, res) => {
        // Check if the user is an admin and redirect them to the admin dashboard
        if (req.session.role && req.session.role.toLowerCase() === 'admin') {
            return res.redirect('/admin/admindashboard');
        }
        // Proceed to user homepage if not an admin
        res.render('userhomepage', { nickName: req.session.nickName });
    },
    registerUser: async (req, res) => {
        const { nickName, firstName, middleName, lastName, gender, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        try {
            // Create a user with default role 'user'
            await User.create(nickName, firstName, middleName, lastName, gender, email, hashedPassword, 'user');
            res.redirect('/login');
        } catch (error) {
            console.error('Registration error:', error);
            res.status(500).send('Error registering user');
        }
    },
    loginUser: async (req, res) => {
        const { email, password } = req.body;

        try {
            const [rows] = await User.findByEmail(email);
            if (rows.length > 0) {
                const user = rows[0];
                const isMatch = await bcrypt.compare(password, user.password);

                if (isMatch) {
                    req.session.nickName = `${user.nickname}`;
                    req.session.role = user.role; // Store the user role in session

                    // Redirect based on user role
                    if (user.role && user.role.toLowerCase() === 'admin') {
                        req.session.userId = user.id; // Set user ID in session
                        return res.redirect('/admin/admindashboard'); // Admin dashboard
                    } else {
                        return res.redirect('/userhomepage'); // Regular user homepage
                    }
                } else {
                    return res.render('login', { error: 'Invalid email or password.', email: email });
                }
            } else {
                return res.render('login', { error: 'Invalid email or password.', email: email });
            }
        } catch (error) {
            console.error('Login error:', error);
            res.status(500).send('Error logging in');
        }
    }
};

module.exports = ph;
