const express = require('express');
const session = require('express-session');
const path = require('path');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');
const adminRoutes = require('./routes/adminRoutes');
const Product = require('./models/Product');
const dotenv = require('dotenv'); // Load environment variables

dotenv.config(); // Initialize dotenv for using .env file

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Session Configuration
app.use(session({
  secret: process.env.SESSION_SECRET || 'your-secret-key', // Use .env for sensitive data
  resave: false,
  saveUninitialized: false, // Only save session if something is stored
  cookie: {
    secure: process.env.NODE_ENV === 'production', // Enable secure cookies in production
    httpOnly: true, // Prevent client-side JavaScript from accessing the cookie
    maxAge: 24 * 60 * 60 * 1000 // 1 day session expiry
  }
}));
app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  next();
});
// Set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
app.use('/users', userRoutes);
app.use('/products', productRoutes);
app.use('/cart', cartRoutes);
app.use('/orders', orderRoutes);
app.use('/admin', adminRoutes);


// Home route
app.get('/', (req, res, next) => {
  Product.findAll()
    .then(([products]) => {
      const featuredProducts = products.slice(0, 3); // Get first 3 products as featured
      res.render('index', { 
        featuredProducts: featuredProducts,
        user: req.session.user || null // Check if user session exists
      });
    })
    .catch(err => next(err)); // Pass error to centralized error handler
});

// FAQ route
app.get('/faq', (req, res) => {
  res.render('faq', { user: req.session.user || null });
});

// about route
app.get('/about', (req, res) => {
  res.render('about', { user: req.session.user || null });
});

// contact route
app.get('/contact', (req, res) => {
  res.render('contact', { user: req.session.user || null });
});

// terms route
app.get('/terms', (req, res) => {
  res.render('terms', { user: req.session.user || null });
});

// login route
app.get('/login', (req, res) => {
  res.render('login', { user: req.session.user || null });
});


// regist3er route
app.get('/register', (req, res) => {
  res.render('register', { user: req.session.user || null });
});



// 404 Route
app.use((req, res, next) => {
  res.status(404).render('error', { 
    error: 'Page not found',
    statusCode: 404
  });
});

// Centralized Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack); // Log the error stack for debugging
  res.status(err.status || 500).render('error', { 
    error: err.message || 'Something went wrong!', // Pass the error message
    statusCode: err.status || 500 // Pass the status code
  });
});





// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
