const express = require('express');
const createHttpError = require('http-errors');
const morgan = require('morgan');
require('dotenv').config();
const pool = require("./db")
const connectFlash = require('connect-flash');
const passport = require('passport');
const { ensureLoggedIn } = require('connect-ensure-login');
const session = require('express-session');
const { verifyToken, verifyAdmin } = require('./middleware/verifyToken');
const cors = require('cors');

// Allow requests from 'http://localhost:3000'

// Initialization
const app = express();

app.use(cors({ origin: 'http://localhost:3000' }));

app.use(morgan('dev'));
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));



app.use(express.json());

// For Passport JS Authentication
app.use(passport.initialize());
app.use(passport.session());
require('./utils/passport.auth');

app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

// Connect Flash
// app.use(connectFlash());
// app.use((req, res, next) => {
//   res.locals.messages = req.flash();
//   console.log("hjhkl")
//   next();
// });

// Routes
app.use('/', require('./routes/index.route'));
app.use('/auth', require('./routes/auth.route'));
app.use(
  '/user',
  // ensureLoggedIn({ redirectTo: '/auth/login' }),
  require('./routes/employee.route')
);
app.use(
  '/admin',
  // verifyToken,
  // verifyAdmin,
  require('./routes/admin.route')
);

// 404 Handler
app.use((req, res, next) => {
  next(createHttpError.NotFound());
});

// Error Handler
app.use((error, req, res, next) => {
  error.status = error.status || 500;
  res.status(error.status);
  res.render('error_40x', { error });
});

function ensureAdmin(req, res, next) {
  if (req.user.role === roles.admin) {
    next();
  } else {
    req.flash('warning', 'you are not Authorized to see this route');
    res.redirect('/');
  }
}

app.listen(8080, () => {
  console.log("listening on port 8080")
})