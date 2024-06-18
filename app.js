// app.js

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors"); // Import cors
const sequelize = require("./config/db"); // Menggunakan konfigurasi database Anda
const path = require("path");
// Rute-rute
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/admin");
const itemRoutes = require("./routes/item");
const historyRoutes = require("./routes/history");

// Middleware
app.use(cors()); // Gunakan cors
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Penggunaan rute
app.use("/auth", authRoutes); // Rute untuk autentikasi
app.use("/users", userRoutes); // Rute untuk model User
app.use("/items", itemRoutes); // Rute untuk model Item
app.use("/history", historyRoutes); // Rute untuk model Item
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
// Sync basis data (jika diperlukan)
// sequelize.sync({ alter: true }) // Untuk mengubah struktur tabel secara aman

const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);

  try {
    // Melakukan koneksi ke basis data
    await sequelize.authenticate();
    console.log("Database connection has been established successfully");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
});

module.exports = app;
