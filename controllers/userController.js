const User = require('../models/User');
const bcrypt = require('bcryptjs');

exports.register = (req, res) => {
  const { name, email, password } = req.body;

  User.findByEmail(email)
    .then(([rows]) => {
      if (rows.length > 0) {
        return res.status(400).render('register', { error: 'Email already exists' });
      }

      return bcrypt.hash(password, 12);
    })
    .then((hashedPassword) => {
      return User.create(name, email, hashedPassword);
    })
    .then(() => {
      res.redirect('/login');
    })
    .catch((err) => {
      console.error(err);
      res.status(500).render('register', { error: 'Server error' });
    });
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  User.findByEmail(email)
    .then(([rows]) => {
      if (rows.length === 0) {
        return res.status(400).render('login', { error: 'Invalid email or password' });
      }

      const user = rows[0];
      return bcrypt.compare(password, user.password)
        .then((isMatch) => {
          if (!isMatch) {
            return res.status(400).render('login', { error: 'Invalid email or password' });
          }

          // Store user info in session
          req.session.user = {
            id: user.id,
            name: user.name,
            email: user.email
          };
          res.redirect('/');
        });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).render('login', { error: 'Server error' });
    });
};


exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error(err);
    }
    res.redirect('/');
  });
};