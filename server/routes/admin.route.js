const User = require('../models/user.model');
const Employee = require("../models/employee.model")
const Package = require("../models/package.model")
const PackageStatus = require("../models/package_status.model")
const { pool } = require("../db")
const router = require('express').Router();
const { roles } = require('../utils/constants');
const { verifyToken, verifyAdmin } = require('../middleware/verifyToken');

router.get('/employee-details', async (req, res, next) => {
  try {
    const employee_data = await pool.query("SELECT emp_id, emp_name, email, phone, pkgId from EMPLOYEE;");
    // console.log(employee_data.rows)
    // res.status(200).json(employee_data.rows);
    console.log("asdasdasd", employee_data.rows)
    res.status(200).json({ count: employee_data.rowCount, data: employee_data.rows });
  } catch (err) {
    console.log(err)
  }
});

router.get('/getAllPackages', async (req, res, next) => {
  const query = {
    text: `SELECT p.pkg_id, p.pkg_brand, p.empname, e.emp_id, p.date, ps.pkg_received, ps.pkg_receivedby, ps.pkg_received_date
              FROM package_status ps
              JOIN package p ON ps.pkg_id = p.pkg_id
              JOIN employee e ON p.empname = e.emp_name;
        `
    // values: [req.params.name]
  }
  // WHERE p.empname = $1 and ps.pkg_received = false;

  const packageData = await pool.query(query)
  res.status(200).json({ count: packageData.rowCount, data: packageData.rows });
});

router.get('/get-employee-names', async (req, res) => {
  const employee_names = await pool.query("SELECT emp_name from EMPLOYEE;");
  console.log(employee_names.rows)
  res.status(200).json(employee_names.rows);
})

router.post('/add-new-package', async (req, res, next) => {
  try {
    const { pkg_brand, empname } = req.body;

    // Create package in our database
    const newPackage = {
      text: 'INSERT INTO package (pkg_brand, empname) VALUES($1, $2) RETURNING *',
      values: [pkg_brand, empname]
    }

    console.log("in")

    const package = await pool.query(newPackage);
    console.log(package)

    // Add this package id to emplyee table
    await pool.query('UPDATE employee SET pkgid = array_append(pkgid, $1) WHERE emp_name = $2', [package.rows[0].pkg_id, empname])
    // Update PackageStatus
    await pool.query('INSERT INTO package_status (pkg_id) VALUES($1)', [package.rows[0].pkg_id])


    res.status(200).json(package);
  } catch (err) {
    console.log(err)
    res.status(400).json(err.detail);
  }
});


// router.get('/package-data/:id', async (req, res, next) => {
//   try {
//     const query = {
//       text: `SELECT p.pkg_id, p.pkg_brand, e.emp_id, e.emp_name, ps.pkg_received, ps.pkg_receivedby
//               FROM package_status ps
//               JOIN package p ON ps.pkg_id = p.pkg_id
//               JOIN employee e ON p.empname = e.emp_name

//               WHERE p.pkg_id = $1;
//         `,
//       values: [req.params.id]
//     }

//     const packageData = await pool.query(query)
//     console.log(packageData.rows)
//   } catch (error) {
//     console.log(error)
//     next(error);
//   }
// });


module.exports = router;
