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
  let email, brand;
  console.log(req.body)
  try {
    const { pkg_brand, empname } = req.body;

    // Create package in our database
    const newPackage = {
      text: 'INSERT INTO package (pkg_brand, empname) VALUES($1, $2) RETURNING *',
      values: [pkg_brand, empname]
    }
    const getEmail = {
      text: 'Select email from employee where emp_name=$1',
      values: [empname]
    }

    console.log("in")

    const package = await pool.query(newPackage);
    console.log(package)
    const emailResult = await pool.query(getEmail)
    console.log("email", emailResult.rows[0].email)
    email = emailResult.rows[0].email
    brand = pkg_brand

    // Add this package id to emplyee table
    await pool.query('UPDATE employee SET pkgid = array_append(pkgid, $1) WHERE emp_name = $2', [package.rows[0].pkg_id, empname])
    // Update PackageStatus
    await pool.query('INSERT INTO package_status (pkg_id) VALUES($1)', [package.rows[0].pkg_id])


    res.status(200).json(package);
    // mailDetails.to = emailResult.rows[0].email
  } catch (err) {
    console.log(err)
    res.status(400).json(err.detail);
  }
  const nodemailer = require('nodemailer');

  let mailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'snagwani@argusoft.com',
      pass: 'Argusoftnag@361'
    }
  });

  // const mail = "sanjusha.nagwani50@gmail.com"

  mailDetails = {
    from: 'snagwani@argusoft.com',
    to: email,
    subject: 'Test mail',
    text: 'Your ' + brand + 'package has been recieved in the office.'
  };

  mailTransporter.sendMail(mailDetails, function (err, data) {
    if (err) {
      console.log(mailDetails)
      console.log('Error Occurs');
    } else {
      console.log('Email sent successfully');
    }
  });
  mailTransporter.sendMail(mailDetails, function (err, data) {
    if (err) {
      console.log(mailDetails)
      console.log('Error Occurs');
    } else {
      console.log('Email sent successfully');
    }
  });



  // async function generateEmailForEmployee(empname) {
  //   try {
  //     const query = 'SELECT email FROM employee WHERE emp_name = $1';
  //     const values = [empname];
  //     const result = await client.query(query, values);

  //     if (result.rowCount === 1) {
  //       // Assuming you have only one employee with the provided name
  //       const email = result.rows[0].email;
  //       return email;
  //     } else {
  //       throw new Error('Employee not found or multiple employees with the same name.');
  //     }
  //   } catch (err) {
  //     console.error('Error generating email:', err);
  //     throw err;
  //   }
  // }

  // Usage example:
  // const empName = 'John Doe';
  // generateEmailForEmployee(empname)
  //   .then((email) => {
  //     console.log('Generated email:', email);
  //   })
  //   .catch((err) => {
  //     console.error('Error generating email:', err);
  //   });


  // const nodemail = {
  //   text: 'SELECT e.email FROM employee e WHERE e.emp_name = $1'
  // }
});

//generateEmailForEmployee

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



// async function generateEmailForEmployee(empname) {
//   try {
//     const query = 'SELECT email FROM employee WHERE emp_name = $1';
//     const values = [empname];
//     const result = await client.query(query, values);

//     if (result.rowCount === 1) {
//       // Assuming you have only one employee with the provided name
//       const email = result.rows[0].email;
//       return email;
//     } else {
//       throw new Error('Employee not found or multiple employees with the same name.');
//     }
//   } catch (err) {
//     console.error('Error generating email:', err);
//     throw err;
//   }
// }

// Usage example:
// const empName = 'John Doe';
// generateEmailForEmployee(empname)
//   .then((email) => {
//     console.log('Generated email:', email);
//   })
//   .catch((err) => {
//     console.error('Error generating email:', err);
//   });


// const nodemail = {
//   text: 'SELECT e.email FROM employee e WHERE e.emp_name = $1'
// }
// });

//generateEmailForEmployee

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
