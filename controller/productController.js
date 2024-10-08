
// Fetch products in the Kids category
exports.getKidsCategory = async (req, res) => {
  try {
      const products = await Product.getProductsByCategory('kids');
      res.render('categories/kids', { products });
  } catch (err) {
      console.error('Error fetching kids products:', err);
      res.status(500).send('Server Error');
  }
};

// Fetch products in the Teens category
exports.getTeensCategory = async (req, res) => {
  try {
      const products = await Product.getProductsByCategory('teens');
      res.render('categories/teens', { products });
  } catch (err) {
      console.error('Error fetching teens products:', err);
      res.status(500).send('Server Error');
  }
};

// Fetch products in the Adults category
exports.getAdultsCategory = async (req, res) => {
  try {
      const products = await Product.getProductsByCategory('adults');
      res.render('categories/adults', { products });
  } catch (err) {
      console.error('Error fetching adults products:', err);
      res.status(500).send('Server Error');
  }
};

// Fetch products in the Trends category
exports.getTrendsCategory = async (req, res) => {
  try {
      const products = await Product.getProductsByCategory('trends');
      res.render('categories/trends', { products });
  } catch (err) {
      console.error('Error fetching trends products:', err);
      res.status(500).send('Server Error');
  }
};

// Fetch products in the Customize category
exports.getCustomizeCategory = async (req, res) => {
  try {
      const products = await Product.getProductsByCategory('customize');
      res.render('categories/customize', { products });
  } catch (err) {
      console.error('Error fetching customize products:', err);
      res.status(500).send('Server Error');
  }
};
const Product = require('../models/Product');