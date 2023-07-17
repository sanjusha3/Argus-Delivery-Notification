const { DataTypes } = require('sequelize');
const { sequelize } = require('../db.js');
const Package = require("./package.model.js")

const Employee = sequelize.define('Employee', {
  emp_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true
    // autoIncrement: true,
  },
  emp_name: {
    type: DataTypes.STRING(20),
    primaryKey: true,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING(35),
    allowNull: false,
    unique: true
  },
  phone: {
    type: DataTypes.STRING(10),
    allowNull: false,
    unique: true
  },
  pswd: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  pkgid: {
    type: DataTypes.BIGINT,
    allowNull: true,
  },
  role: {
    type: DataTypes.STRING(8),
    defaultValue: "employee"
  }
}, {
  tableName: "employee",
  timestamps: false
});

// Define associations


module.exports = Employee;
