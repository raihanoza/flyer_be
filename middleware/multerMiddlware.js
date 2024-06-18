// multerMiddleware.js
const multer = require("multer");

// Konfigurasi multer untuk mengatur penyimpanan gambar
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../uploads"); // Mengatur folder penyimpanan gambar (pastikan folder sudah ada)
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // Memberi nama unik pada gambar yang diunggah
  },
});

const upload = multer({ storage: storage }).single("image"); // 'image' adalah nama field pada form-data

module.exports = upload;
