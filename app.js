const bodyParser = require('body-parser');
const express = require('express');
const session = require('express-session');
const userRouter = require('./routes/userRouter');
const adminRouter = require('./routes/adminRouter');
const productRouter = require('./routes/productRouter');  // Add this line for product routes
const cartRouter = require('./routes/cartRouter');
const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// Session configuration
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: false,    
    cookie: { secure: false } // Set to true if using HTTPS
}));



// Routes
app.use('/', userRouter);
app.use('/admin', adminRouter);
app.use('/products', productRouter);

app.listen(4000, () => {
    console.log('Server running at http://localhost:4000');
});

app.get('/faq', (req, res) => {
  res.render('faq', { user: req.session.user || null });
});

app.get('/terms', (req, res) => {
  res.render('terms', { user: req.session.user || null });
});

app.get('/contact', (req, res) => {
  res.render('contact', { user: req.session.user || null });
});

app.get('/about', (req, res) => {
  res.render('about', { user: req.session.user || null });
});


app.use('/cart', cartRouter);

