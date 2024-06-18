// middleware/auth.js
const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  let token = req.headers["authorization"];

  if (!token) {
    return res.status(401).json({ message: "Token not provided" });
  }

  // Split token string to separate the "Bearer" prefix
  const tokenParts = token.split(" ");

  if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
    return res.status(401).json({ message: "Invalid token format" });
  }

  // Extract the token without the "Bearer" prefix
  token = tokenParts[1];

  jwt.verify(token, "your_secret_key", (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Failed to authenticate token" });
    }
    req.decoded = decoded;
    next();
  });
};

module.exports = verifyToken;

module.exports = verifyToken;
