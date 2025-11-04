const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();
const http = require("http");
const path = require("path");
const server = http.createServer(app);
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");

const clients = new Map();
module.exports.clients = clients;

app.use(bodyParser.json());

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const mongoose = require("mongoose");

mongoose.set("strictQuery", true);
mongoose
  .connect(process.env.MONGODB_URI, {
    dbName: process.env.MONGODB_DB || "PAM",
  })
  .then(() => console.log("[mongo] connected"))
  .catch((err) => {
    console.error("[mongo] connection error", err);
    process.exit(1);
  });

const cors = require("cors");
app.use(cors());

// JSON body parser (you already have bodyParser; either is fine)
app.use(express.json({ limit: "1mb" }));

const submissionsRouter = require("./routes/SindersSubmissions");
app.use("/api/submissions", submissionsRouter);

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

app.post("/api/check-artist-password", async (req, res) => {
  const password = req.body.password;
  try {
    if (password === process.env.REACT_APP_ARTIST_PASSWORD) {
      res.send({ success: true });
    } else {
      res.send({ success: false });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
});

app.post("/api/verify-password", (req, res) => {
  // const identity = req.body.identity;
  if (req.body.password === process.env.ADMIN_PASSWORD) {
    // do I need username?
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
