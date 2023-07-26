const express = require('express');
const createHttpError = require('http-errors');
const morgan = require('morgan');
require('dotenv').config();
const { ensureLoggedIn } = require('connect-ensure-login');
const { verifyToken, verifyAdmin, verifyEmployee } = require('./middleware/verifyToken');
const cors = require('cors');
const cookies = require("cookie-parser");

// Initialization
const app = express();

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(cookies());

app.use(morgan('dev'));

app.use(express.json());

app.use((req, res, next) => {
  res.locals.user = req.user;
  // res.header({ "Access-Control-Allow-Origin": "*" });
  next();
});

// Routes
app.use('/auth', require('./routes/auth.route'));
app.use(
  '/employee',
  verifyToken,
  verifyEmployee,
  require('./routes/employee.route')
);
app.use(
  '/admin',
  verifyToken,
  verifyAdmin,
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

app.listen(8000, () => {
  console.log("Listening on port 8000")
})