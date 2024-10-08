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

router.get('/adminaddproducts/:category', (req, res) => {
    const { category } = req.params;
    res.render('adminaddproducts', { category });
});
router.delete('/adminviewproducts/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const category = req.query.category;
    await Product.deleteProduct(id);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
});
router.get('/adminproduct/:id', adminController.getProductForEdit); // Fetch product details for editing

// Update product
router.post('/adminupdateproduct', upload.single('imageUrl'), adminController.updateProduct);




// Handle product addition with image upload
router.post('/adminaddproducts', upload.single('imageUrl'), adminController.addProduct);

module.exports = router;
