// models/otp.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db"); // Sesuaikan dengan lokasi konfigurasi koneksi database Anda

const Otp = sequelize.define(
  "otp",
  {
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true, // Add timestamps (createdAt, updatedAt)
  }
);

module.exports = { Otp };
