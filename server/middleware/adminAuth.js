// middleware/adminAuth.js
const jwt = require("jsonwebtoken");

module.exports = function adminAuth(req, res, next) {
  const h = req.headers.authorization || "";
  const token = h.startsWith("Bearer ") ? h.slice(7) : null;
  if (!token)
    return res.status(401).json({ ok: false, error: "Missing token" });

  try {
    const payload = jwt.verify(token, process.env.ADMIN_SECRET);
    req.user = payload;
    next();
  } catch {
    return res.status(401).json({ ok: false, error: "Invalid token" });
  }
};
