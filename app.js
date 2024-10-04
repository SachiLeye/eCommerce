const bodyParser = require('body-parser');
const express = require('express');
const session = require('express-session');
const userRouter = require('./routes/userRouter');
const adminRouter = require('./routes/adminRouter');
const productRouter = require('./routes/productRouter');  // Add this line for product routes
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

app.use((req, res, next) => {
    res.locals.nickName = req.session.nickName || null;
    res.locals.role = req.session.role || null;
    next();
});

// Routes
app.use('/', userRouter);
app.use('/admin', adminRouter);
app.use('/products', productRouter);

app.listen(4000, () => {
    console.log('Server running at http://localhost:4000');
});
