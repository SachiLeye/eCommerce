const Product = require('../models/Product');

//controller to handle fetching all products
exports.getAllProducts = (req, res) => {
  Product.findAll()
    .then(([products]) => {
      res.render('products/list', { products });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).render('error', { error: 'Failed to load products' });
    });
};

//Controller to Handle fetching details of a specific product
exports.getProductDetails = (req, res) => {
  const productId = req.params.id;
  Product.findById(productId)
    .then(([products]) => {
      if (products.length === 0) {
        return res.status(404).render('error', { error: 'Product not found' });
      }
      res.render('products/detail', { product: products[0] });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).render('error', { error: 'Failed to load product details' });
    });
};

//to handle fetching by category
exports.getProductsByCategory = (req, res) => {
  const category = req.params.category;
  Product.findByCategory(category)
    .then(([products]) => {
      res.render(`categories/${category}`, { products });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).render('error', { error: 'Failed to load products' });
    });
};