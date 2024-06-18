const { Sequelize } = require("sequelize");
require("dotenv").config(); // Untuk mengambil nilai dari file .env

const sequelize = new Sequelize({
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT,
  // Tambahan opsional:
  port: 3306, // Port default untuk MySQL
  // logging: false, // Nonaktifkan log query SQL (opsional)
});

module.exports = sequelize;
