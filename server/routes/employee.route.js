const router = require('express').Router();
const { pool } = require("../db")


router.get('/get-employee-packages/:name', async (req, res, next) => {
  try {
    const query = {
      text: `SELECT p.pkg_id, p.pkg_brand, p.empname, p.date, ps.pkg_received, ps.pkg_receivedby, ps.pkg_received_date
              FROM package_status ps
              JOIN package p ON ps.pkg_id = p.pkg_id
              WHERE p.empname = $1 and ps.pkg_received = false;
        `,
      values: [req.params.name]
    }

    const packageData = await pool.query(query)
    res.status(200).json({ data: packageData.rows, status: true });
  } catch (err) {
    console.log(err)
    res.status(400).json({ err: err.detail, status: false });
  }
});


module.exports = router;
