const express = require('express');
const createHttpError = require('http-errors');
const morgan = require('morgan');
require('dotenv').config();
const pool = require("./db")
const connectFlash = require('connect-flash');
const passport = require('passport');
const { ensureLoggedIn } = require('connect-ensure-login');
const session = require('express-session');
const { verifyToken, verifyAdmin, verifyEmployee } = require('./middleware/verifyToken');
const cors = require('cors');
// Initialization
const app = express();

const cookies = require("cookie-parser");

// app.use(cors())

// app.use(cors({
//   origin: 'http://localhost:3000', // Replace with your frontend URL
//   credentials: true, // Enable credentials (cookies, in this case) to be sent in CORS requests
// }));

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(cookies());


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
  // res.header({ "Access-Control-Allow-Origin": "*" });
  next();
});

// Routes
app.use('/', require('./routes/index.route'));
app.use('/auth', require('./routes/auth.route'));
app.get('/test-cookies', (req, res) => {
  console.log(req.headers)
  res.json({ cookies: req.cookies });
});

app.use(
  '/employee',
  // verifyToken,
  verifyEmployee,
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

app.listen(8080, () => {
  console.log("Listening on port 8080")
})