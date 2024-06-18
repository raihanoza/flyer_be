// models/user.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db"); // Sesuaikan dengan lokasi konfigurasi koneksi database Anda

const Admin = sequelize.define("admin", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Admin;
