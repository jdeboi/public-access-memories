const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();
const http = require("http");
const path = require("path");
const server = http.createServer(app);
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const rateLimit = require("express-rate-limit");

const clients = new Map();
module.exports.clients = clients;

app.use(bodyParser.json());

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const cors = require("cors");
const allowedOrigins = [
  "http://localhost:3000",
  "https://www.publicaccessmemories.com",
  "https://publicaccessmemories.com",
];
app.use(cors({ origin: allowedOrigins }));

const authLimiter = rateLimit({ windowMs: 15 * 60_000, max: 20 });

// JSON body parser (you already have bodyParser; either is fine)
app.use(express.json({ limit: "1mb" }));

const origin =
  process.env.NODE_ENV != "production"
    ? "http://localhost:3000"
    : "https://www.publicaccessmemories.com/";
const io = require("socket.io")(server, {
  cors: {
    origin: origin,
    methods: ["GET", "POST"],
  },
});

module.exports.io = io;

const ClientManager = require("./ClientManager");
io.on("connection", ClientManager);

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

function safeEqual(a, b) {
  try {
    return crypto.timingSafeEqual(Buffer.from(a), Buffer.from(b));
  } catch {
    return false;
  }
}

app.post("/api/check-artist-password", authLimiter, async (req, res) => {
  const password = req.body.password || "";
  const match = safeEqual(password, process.env.REACT_APP_ARTIST_PASSWORD || "");
  res.json({ success: match });
});

app.post("/api/verify-password", authLimiter, (req, res) => {
  const password = req.body.password || "";
  if (safeEqual(password, process.env.ADMIN_PASSWORD || "")) {
    const token = jwt.sign({ username: "admin" }, process.env.ADMIN_SECRET, {
      expiresIn: "5d",
    });
    res.json({ isValid: true, token });
  } else {
    res.json({ isValid: false });
  }
});

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, "/../client/build")));

app.get("/privacy", (req, res) => {
  res.sendFile(path.join(__dirname + "/../client/build/privacy.html"));
});

// Anything that doesn't match the above, send back index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/../client/build/index.html"));
});

server.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
