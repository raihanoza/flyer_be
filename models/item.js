// models/item.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db"); // Sesuaikan dengan lokasi konfigurasi koneksi database Anda

const Item = sequelize.define("item", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  month: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  year: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  duration: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  mekah: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  mekah_rating: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  madina: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  madina_rating: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  rate: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  maskapai: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = Item;
