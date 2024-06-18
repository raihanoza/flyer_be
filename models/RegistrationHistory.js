// models/registrationHistory.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db"); // Sesuaikan dengan lokasi konfigurasi koneksi database Anda

const RegistrationHistory = sequelize.define("RegistrationHistories", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  registrationDate: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
});

module.exports = { RegistrationHistory };
