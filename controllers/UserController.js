// authController.js
const axios = require("axios");
const jwt = require("jsonwebtoken");
const { User } = require("../models/user");
const { Otp } = require("../models/otp");
const { RegistrationHistory } = require("../models/RegistrationHistory");
const Validator = require("fastest-validator");
const v = new Validator();
const register = async (req, res) => {
  const schema = {
    phone: "string",
    name: "string",
  };

  const validate = v.validate(req.body, schema);
  if (validate.length) {
    res.json({
      status: "error",
      error: validate,
    });
    return;
  }

  const processUser = async () => {
    const [user, created] = await User.findOrCreate({
      where: { phone: req.body.phone },
      defaults: { name: req.body.name },
    });
    await RegistrationHistory.create({
      phone: req.body.phone,
      name: req.body.name,
    });
    if (created) {
      res.json({
        status: "success",
        message: "User created successfully!",
        phone: phone,
      });
    } else {
      console.log("User already exists:", user.toJSON());
      // User already exists, proceed with sending OTP
      res.json({
        status: "success",
        phone: phone,
        message: "User already exists. OTP sent successfully!",
      });
    }
  };

  let otpCode = Math.floor(Math.random() * 9000) + 1000;
  const wablasToken = process.env.WABLAS_TOKEN;
  const message =
    otpCode +
    ` adalah kode verifikasi anda Demi keamanan, Jangan bagikan kode ini kepada siapapun. Pembayaran DP ataupun Pelunasan bisa dibayarkan secara cash maupun transfer.
BCA : 8075302203 / A.n PT. AMEERA MEKKAH TRAVEL
BRI : 040401001684568 / A.n PT. AMEERA MEKKAH TRAVEL
BSI : 2203198704 / A.n PT. AMEERA MEKKAH TRAVEL
MANDIRI : 1060022032299 / A.n PT. AMEERA MEKKAH TRAVEL
BANK SUMUT SYARIAH : 61402300007366 / A.n PT. AMEERA MEKKAH TRAVEL.

HARAP MELAKUKAN KONFIRMASI SETELAH MELAKUKAN PEMBAYARAN DAN MENYIMPAN BUKTI PEMBAYARAN. Pembayaran dianggap SAH jika mendapatkan kwitansi`;
  const phone = req.body.phone;

  try {
    const result = await axios.get(
      `https://jogja.wablas.com/api/send-message?phone=${phone}&message=${message}&token=${wablasToken}`
    );

    if (result.data.status === true) {
      const existingOtp = await Otp.findOne({
        where: { phone: req.body.phone },
      });

      if (existingOtp) {
        await Otp.update({ code: otpCode }, { where: { phone: phone } });
      } else {
        await Otp.create({
          phone: phone,
          code: otpCode,
        });
      }

      await processUser();
    } else {
      res.json({
        status: "error",
        message: "Error sending OTP",
      });
    }
  } catch (error) {
    console.error("Error sending OTP:", error);
    res.json({
      status: "error",
      message: "Error sending OTP",
    });
  }
};

const verify = async (req, res) => {
  const schema = {
    phone: "string",
    code: "string",
  };

  const validate = v.validate(req.body, schema);
  if (validate.length) {
    res.json({
      status: "error",
      error: validate,
    });
    return;
  }

  try {
    const result = await Otp.findOne({
      where: { phone: req.body.phone },
    });

    if (result && result.code === req.body.code) {
      const userData = await User.findOne({
        where: { phone: req.body.phone },
      });

      if (userData) {
        const data = userData.toJSON();
        const token = jwt.sign({ data }, process.env.TOKEN_KEY, {
          expiresIn: "5m",
        });

        res.json({
          status: "success",
          message: "Verification successful!",
          token: token,
          data: userData,
        });
      } else {
        // User not found, still send JWT token
        const token = jwt.sign(
          { phone: req.body.phone },
          process.env.TOKEN_KEY,
          { expiresIn: "5m" }
        );

        res.json({
          status: "success",
          message: "User not found. Verification successful!",
          token: token,
        });
      }
    } else {
      res.json({
        status: "error",
        message: "OTP does not match",
      });
    }
  } catch (error) {
    console.error("Error during verification:", error);
    res.json({
      status: "error",
      message: "Error during verification",
    });
  }
};

module.exports = {
  register,
  verify,
};
