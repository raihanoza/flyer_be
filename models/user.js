// models/user.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db"); // Sesuaikan dengan lokasi konfigurasi koneksi database Anda
const User = sequelize.define(
  "Users",
  {
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    timestamps: true, // Add timestamps (createdAt, updatedAt)
  }
);

module.exports = { User };
