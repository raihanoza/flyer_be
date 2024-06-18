const moment = require("moment");
const { RegistrationHistory } = require("../models/RegistrationHistory");
const { Op } = require("sequelize");
async function getAllHistory(req, res) {
  try {
    // Tangkap parameter dari permintaan (request)
    const { startDate, endDate, month, year, page } = req.query;

    // Konversi tanggal ke format yang sesuai dengan penyesuaian zona waktu UTC
    const startDateFormatted = startDate
      ? moment.utc(startDate, "DD-MM-YYYY").toDate()
      : undefined;
    const endDateFormatted = endDate
      ? moment.utc(endDate, "DD-MM-YYYY").endOf("day").toDate()
      : undefined;

    // Hitung nilai offset berdasarkan halaman yang diminta
    const currentPage = parseInt(page, 10) || 1;
    const perPage = 10;
    const offset = (currentPage - 1) * perPage;

    // Bangun kueri berdasarkan parameter yang diterima
    const whereCondition = {};
    if (startDateFormatted && endDateFormatted) {
      whereCondition.createdAt = {
        [Op.between]: [
          moment.utc(startDateFormatted).startOf("day").toDate(), // Pastikan dimulai dari mulai hari
          endDateFormatted,
        ],
      };
    } else if (month && year) {
      const startOfMonth = moment
        .utc(`${year}-${month}-01`, "YYYY-MM-DD")
        .toDate();
      const endOfMonth = moment
        .utc(`${year}-${month}-01`, "YYYY-MM-DD")
        .endOf("month")
        .toDate();
      whereCondition.createdAt = {
        [Op.between]: [startOfMonth, endOfMonth],
      };
    }

    // Jalankan kueri menggunakan kueri yang dibangun
    const { count, rows } = await RegistrationHistory.findAndCountAll({
      where: whereCondition,
      limit: perPage,
      offset: offset,
    });

    const total = count;
    const lastPage = Math.ceil(total / perPage);

    const responseData = {
      data: rows,
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

module.exports = {
  getAllHistory,
};
