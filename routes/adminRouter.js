const express = require('express');
const router = express.Router();
const adminController = require('../controller/adminController');
const multer = require('multer');
const path = require('path');
const Product = require('../models/Product'); 

// Set up storage for image uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Specify the directory for file uploads
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Unique filename with extension
    }
});

const upload = multer({ storage: storage });

// Admin dashboard route
router.get('/admindashboard', adminController.admindash);

router.get('/adminviewproducts', async (req, res) => {
    try {
      const category = req.query.category || 'kids'; // Default to 'kids' if no category is specified
      const products = await Product.getProductsByCategory(category);
      res.render('adminviewproducts', { products, category });
    } catch (err) {
      console.error(err);
      res.status(500).send('Error retrieving products');
    }
  });
// Render the add product page for a specific category
router.get('/adminaddproducts/:category', (req, res) => {
    const { category } = req.params;
    res.render('adminaddproducts', { category });
});

// Handle product addition with image upload
router.post('/adminaddproducts', upload.single('imageUrl'), adminController.addProduct);

module.exports = router;
