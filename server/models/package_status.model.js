const { DataTypes } = require('sequelize');
const { sequelize } = require('../db');
const Package = require('./package.model');

const PackageStatus = sequelize.define('PackageStatus', {
  pkg_id: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },
  pkg_received: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  pkg_receivedby: {
    type: DataTypes.STRING(20),
    allowNull: true,
  },
  pkg_received_date: {
    type: DataTypes.DATE,
  }
}, {
  tableName: "package_status",
  timestamps: false
});

// Define associations


module.exports = PackageStatus;
