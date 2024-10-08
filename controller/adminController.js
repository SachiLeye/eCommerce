const db = require('../config/db'); 
const Product = require('../models/Product'); // Product model handles DB operations
const path = require('path');
const fs = require('fs');

const adminController = {
    // Admin dashboard rendering with session validation
    admindash: (req, res) => {
        if (req.session.userId && req.session.role === 'admin') {
            res.render('admindashboard', { nickName: req.session.nickName });
        } else {
            res.redirect('/login'); // Redirect to login if user is not admin
        }
    },

    // Handle form submission to add new products
    addProduct: async (req, res) => {
        try {
            console.log('Add product initiated');
    
            const { name, description, price, stock, category } = req.body;
            if (!name || !description || !price || !stock || !category) {
                console.log('Invalid form data');
                return res.status(400).send('Invalid form data');
            }
    
            const imageUrl = req.file ? req.file.filename : '';
    
            console.log('Product details:', { name, description, price, stock, category, imageUrl });
    
            // Call the Product model to insert the product into the database
            const result = await Product.addProduct({
                name,
                description,
                price,
                stock,
                category,
                image_url: imageUrl
            });
    
            console.log('Product successfully inserted:', result);
    
            // Redirect to view products after successful addition
            res.redirect('/admin/adminviewproducts');
        } catch (err) {
            console.error('Error inserting product:', err);
            res.status(500).send('Failed to add product');
        }
    },
    getProductForEdit: async (req, res) => {
        try {
            const id = req.params.id;
            const product = await Product.getProductById(id); // Add this method in the Product model
            res.json(product);
        } catch (err) {
            console.error('Error fetching product for edit:', err);
            res.status(500).send('Failed to fetch product details');
        }
    },

    // Handle product update
    updateProduct: async (req, res) => {
        try {
            const { id, name, description, price, stock, category } = req.body;
            const imageUrl = req.file ? req.file.filename : '';
            await Product.updateProduct({
                id,
                name,
                description,
                price,
                stock,
                category,
                image_url: imageUrl
            });
            res.json({ success: true });
        } catch (err) {
            console.error('Error updating product:', err);
            res.status(500).json({ success: false });
        }
    }
};

module.exports = adminController;
