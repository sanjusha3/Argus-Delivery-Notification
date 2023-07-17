const { DataTypes } = require('sequelize');
const { sequelize } = require('../db.js');
const Employee = require("./employee.model.js");
const PackageStatus = require("./package_status.model.js");

const Package = sequelize.define('Package', {
  pkg_id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  pkg_brand: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  empname: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    default: new Date().toISOString()
  }
}, {
  tableName: "package",
  timestamps: false,
});

// Define associations
// Employee.associate = function (models) {
//   Employee.hasMany(Package, { foreignKey: 'emp_name' });
// }

Package.associate = function (models) {
  Package.belongsTo(Employee, { foreignKey: 'empname' });
  Package.hasOne(PackageStatus, { foreignKey: 'pkg_id' });
}

PackageStatus.belongsTo(Package, { foreignKey: 'pkg_id' });

module.exports = Package;
