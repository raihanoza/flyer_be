// userSeed.js
const bcrypt = require("bcrypt");
const { User } = require("./models/user"); // Sesuaikan path dengan model User Anda

const seedUsers = async () => {
  try {
    // Hash password sebelum dimasukkan ke dalam database
    const hashedPassword = await bcrypt.hash("password123", 10); // Ganti dengan password yang ingin Anda gunakan

    // Data pengguna awal
    const usersData = [
      {
        email: "admin@example.com",
        password: hashedPassword,
      },
      {
        email: "admin2@example.com",
        password: hashedPassword,
      },
      // Tambahkan data pengguna lain jika diperlukan
    ];

    // Masukkan data pengguna ke dalam database
    await User.bulkCreate(usersData);
    console.log("Seed data for users inserted successfully.");
  } catch (error) {
    console.error("Error seeding users:", error);
  }
};

seedUsers();
