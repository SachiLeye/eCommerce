const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Render the admin login page
router.get('/login', (req, res) => {
  res.render('admin/login', { user: req.session.user || null });
});

// Admin login route
router.post('/login', (req, res) => {
    const { email, password } = req.body;
  
    // Hardcoded admin credentials
    if (email === 'admin' && password === 'admin') {
      req.session.user = { email: 'admin' }; // Set the session for admin user
      res.redirect('/admin/dashboard'); // Redirect to admin dashboard
    } else {
      res.render('admin/login', { error: 'Invalid admin credentials', user: req.session.user || null });
    }
  });
  

// Logout route
router.post('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.redirect('/admin/dashboard'); // Redirect to dashboard on error
    }
    res.redirect('/admin/login'); // Redirect to login after logout
  });
});

// Admin dashboard route
// Admin dashboard route
router.get('/dashboard', (req, res) => {
    if (!req.session.user) {
      return res.redirect('/admin/login'); // Redirect to login if not authenticated
    }
    adminController.getDashboard(req, res); // Call the existing controller method for the dashboard
  });
  

// Existing routes
router.get('/products', (req, res) => {
  if (!req.session.user) {
    return res.redirect('/admin/login');
  }
  adminController.getProducts(req, res);
});
router.get('/add-product', adminController.getAddProduct);
router.post('/add-product', adminController.postAddProduct);
router.get('/edit-product/:id', adminController.getEditProduct);
router.post('/edit-product', adminController.postEditProduct);
router.post('/delete-product', adminController.postDeleteProduct);

module.exports = router;
