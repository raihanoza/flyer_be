"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Admins", [
      {
        email: "admin@example.com",
        password:
          "$2a$10$prtj9yQjzviCYU3bhdVCkObRHnvVdHzkXXr/36gNZn4vtCaTZnJiW",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: "admin2@example.com",
        password:
          "$2a$10$prtj9yQjzviCYU3bhdVCkObRHnvVdHzkXXr/36gNZn4vtCaTZnJiW",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Tambahkan data pengguna lain jika diperlukan
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Users", null, {});
  },
};
