// controller/productController.js

exports.getKidsCategory = (req, res) => {
  res.render('categories/kids'); // Render the kids category view
};

exports.getTeensCategory = (req, res) => {
  res.render('categories/teens'); // Render the teens category view
};

exports.getAdultsCategory = (req, res) => {
  res.render('categories/adults'); // Render the adults category view
};

exports.getTrendsCategory = (req, res) => {
  res.render('categories/trends'); // Render the trends category view
};

exports.getCustomizeCategory = (req, res) => {
  res.render('categories/customize'); // Render the customize category view
};
