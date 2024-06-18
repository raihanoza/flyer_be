// controllers/itemController.js
const Item = require("../models/item");
const multer = require("multer");
const { Op } = require("sequelize"); // Make sure to import Op fromz sequelize

// Konfigurasi multer untuk mengatur penyimpanan gambar
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage }).single("image");

async function createItem(req, res) {
  try {
    upload(req, res, async function (err) {
      if (err instanceof multer.MulterError) {
        return res.status(500).json({ message: "Multer error occurred" });
      } else if (err) {
        return res
          .status(500)
          .json({ message: "Error occurred while uploading" });
      }

      // Check if req.file exists
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      const {
        title,
        category,
        price,
        month,
        year,
        mekah,
        madina,
        mekah_rating,
        madina_rating,
        description,
        rate,
        maskapai,
        duration,
      } = req.body;

      const newItem = await Item.create({
        title,
        category,
        price,
        month,
        year,
        mekah,
        madina,
        mekah_rating,
        madina_rating,
        description,
        maskapai,
        rate,
        duration,
        image: req.file.path, // Save the full path to the 'image' column
      });
      res.status(201).json(newItem);
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
}

// Mendapatkan semua item

const monthNames = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];

async function getAllItems(req, res) {
  try {
    let whereCondition = {}; // Initialize an empty object for the WHERE condition

    const monthName = req.query.month;

    if (monthNames.includes(monthName)) {
      // If the month parameter is valid, add the filtering condition
      whereCondition = {
        month: monthName,
      };
    }

    const items = await Item.findAll({
      where: whereCondition, // Use the whereCondition
      order: [["createdAt", "DESC"]], // Order items by createdAt in descending order
    });

    const total = items.length;
    const perPage = 10;
    const currentPage = 1;
    const lastPage = Math.ceil(total / perPage);

    const responseData = {
      data: items,
      meta: {
        total,
        perPage,
        currentPage,
        lastPage,
      },
    };

    res.status(200).json(responseData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
}

// Mendapatkan item berdasarkan ID
async function getItemById(req, res) {
  try {
    const { id } = req.params;
    const item = await Item.findByPk(id);

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.status(200).json(item);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
}

// Mengupdate item berdasarkan ID
async function updateItem(req, res) {
  try {
    const { id } = req.params;
    const {
      title,
      category,
      price,
      month,
      year,
      mekah,
      madina,
      mekah_rating,
      madina_rating,
      description,
      rate,
      duration,
    } = req.body;

    const item = await Item.findByPk(id);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    await item.update({
      title,
      category,
      price,
      month,
      year,
      mekah,
      madina,
      mekah_rating,
      madina_rating,
      description,
      rate,
      duration,
    });

    res.status(200).json(item);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
}

// Menghapus item berdasarkan ID
async function deleteItem(req, res) {
  try {
    const { id } = req.params;
    const item = await Item.findByPk(id);

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    await item.destroy();
    res.status(200).json({ message: "Item deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
}

module.exports = {
  getAllItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
};
