const router = require('express').Router();
const { pool } = require("../db")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { ensureLoggedOut, ensureLoggedIn } = require('connect-ensure-login');
const validators = require('../utils/validators');
require('dotenv').config();

const maxAge = 60 * 60;

router.post("/login", ensureLoggedOut({ redirectTo: '/' }), async (req, res) => {
  const errors = {}

  const { email, pswd } = req.body;
  if (!email || email.trim() === '') {
    errors.email = 'Email is required';
  }
  if (!pswd || pswd.toString().trim() === '') {
    errors.pswd = 'Password is required';
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ error: errors, status: false })
  }

  const findExistingUser = {
    text: "SELECT * from EMPLOYEE where email = $1;",
    values: [email]
  }
  const doesExist = await pool.query(findExistingUser);
  if (doesExist.rowCount == 0) {
    return res.status(400).json({ error: { email: "Please enter a valid email!" }, status: false })
  }

  const isPasswordMatch = await bcrypt.compare(pswd, doesExist.rows[0].pswd);

  // If the password doesn't match, return an error response
  if (!isPasswordMatch) {
    return res.status(400).json({ error: { pswd: 'Invalid password' }, status: false })
  }

  // Create token
  const token = jwt.sign(
    { email, role: doesExist.rows[0].role },
    process.env.TOKEN_KEY,
    {
      expiresIn: "2h",
    }
  );

  req.user = {
    emp_id: doesExist.rows[0].emp_id,
    name: doesExist.rows[0].emp_name,
    email: doesExist.rows[0].email,
    role: doesExist.rows[0].role
  }

  res.cookie("token", token, {
    withCredentials: true,
    httpOnly: false,
  });
  res.status(200).json({ employee: req.user, status: true });
})

router.post("/register", ensureLoggedOut({ redirectTo: '/' }), async (req, res) => {
  try {
    const { emp_id, emp_name, email, phone, pswd } = req.body;

    // Validate if user exist in our database
    const findExistingUser = {
      text: "SELECT * from EMPLOYEE where email = $1 OR emp_id = $2 OR phone = $3 OR emp_name = $4;",
      values: [email, emp_id, phone, emp_name]
    }
    let errors = {}
    errors = validators(emp_id, emp_name, email, phone, pswd);

    if (errors) {
      return res.status(400).json({ error: errors, status: false })
    }

    const doesExist = await pool.query(findExistingUser);

    if (doesExist.rowCount != 0) {
      if (doesExist.rows[0].emp_id == emp_id) {
        return res.status(409).json({ error: { emp_id: "Employee ID Already exists." }, status: false });
      } else if (doesExist.rows[0].emp_name == emp_name) {
        return res.status(409).json({ error: { emp_name: "Employee name Already exists" }, status: false });
      } else if (doesExist.rows[0].email == email) {
        return res.status(409).json({ error: { email: "Email Already exists" }, status: false });
      } else if (doesExist.rows[0].phone == phone) {
        return res.status(409).json({ error: { phone: "Mobile no. Already Exists" }, status: false });
      }
    }

    //Encrypt user password
    encryptedPassword = await bcrypt.hash(pswd.toString(), 10);

    // Create user in our database
    const query = {
      text: 'INSERT INTO employee(emp_id, emp_name, email, phone, pswd) VALUES($1, $2, $3, $4, $5) RETURNING emp_id, emp_name, email, phone, role',
      values: [emp_id, emp_name, email, phone, encryptedPassword]
    }

    const emp = await pool.query(query);

    // return new user
    res.status(201).json({ employee: emp.rows, status: true });
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err, status: false });
  }
  // Our register logic ends here
});

router.get('/logout', async (req, res, next) => {
  res.clearCookie('token');
  res.status(200).json({ message: 'Logged out successfully.', status: true });
});

module.exports = router;