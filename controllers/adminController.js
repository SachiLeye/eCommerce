const Product = require('../models/Product');

exports.getDashboard = (req, res) => {
  res.render('admin/dashboard');
};

exports.getProducts = (req, res) => {
  Product.findAll()
    .then(([products]) => {
      res.render('admin/products', { products });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).render('error', { error: 'Failed to load products' });
    });
};

exports.getAddProduct = (req, res) => {
  res.render('admin/add-product');
};

exports.postAddProduct = (req, res) => {
  const { name, description, price, stock, category, imageUrl } = req.body;
  Product.create(name, description, parseFloat(price), parseInt(stock), category, imageUrl)
    .then(() => {
      res.redirect('/admin/products');
    })
    .catch((err) => {
      console.error(err);
      res.status(500).render('error', { error: 'Failed to add product' });
    });
};

exports.getEditProduct = (req, res) => {
  const productId = req.params.id;
  Product.findById(productId)
    .then(([products]) => {
      if (products.length === 0) {
        return res.status(404).render('error', { error: 'Product not found' });
      }
      res.render('admin/edit-product', { product: products[0] });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).render('error', { error: 'Failed to load product' });
    });
};

exports.postEditProduct = (req, res) => {
  const { id, name, description, price, stock, category, imageUrl } = req.body;
  Product.update(id, name, description, parseFloat(price), parseInt(stock), category, imageUrl)
    .then(() => {
      res.redirect('/admin/products');
    })
    .catch((err) => {
      console.error(err);
      res.status(500).render('error', { error: 'Failed to update product' });
    });
};

exports.postDeleteProduct = (req, res) => {
  const productId = req.body.id;
  Product.delete(productId)
    .then(() => {
      res.redirect('/admin/products');
    })
    .catch((err) => {
      console.error(err);
      res.status(500).render('error', { error: 'Failed to delete product' });
    });
};