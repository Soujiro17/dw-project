const jwt = require("jsonwebtoken");
require("dotenv").config();

const auth = (req, res, next) => {
  try {
    const token = req.cookies.token;
    const tokenadm = req.cookies.tokenadm;

    if (!token && !tokenadm)
      return res.status(401).json({ status: 401, message: "Unauthorized" });

    const verified = jwt.verify(token || tokenadm, process.env.JWT_SECRET);

    req.user = verified.user;
    req.userId = verified.userId;

    next();
  } catch (err) {
    res.status(401).json({ status: 401, message: "Unauthorized" });
  }
};

module.exports = auth;
