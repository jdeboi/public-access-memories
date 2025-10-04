const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();
const http = require("http");
const path = require("path");
const server = http.createServer(app);
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const SindersSubmission = require("./models/SindersSubmission");
const rateLimit = require("express-rate-limit");
const { z } = require("zod");

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

// Light rate limit to protect write endpoint
const createLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 20,
});

// Zod schemas for validation
const SubmissionCreateSchema = z.object({
  title: z.string().min(1).max(200),
  content: z.string().min(1).max(5000),
  author: z.string().max(200).optional(),
  email: z.string().email().max(250).optional(),
  tags: z.array(z.string().max(50)).optional(),
  room: z.string().max(120).optional(),
});

const SubmissionQuerySchema = z.object({
  q: z.string().max(200).optional(), // search query
  room: z.string().max(120).optional(),
  approved: z.enum(["true", "false"]).optional(),
  hidden: z.enum(["true", "false"]).optional(),
  limit: z.coerce.number().min(1).max(100).default(50),
  page: z.coerce.number().min(1).default(1),
  sort: z.enum(["new", "old"]).default("new"),
});

// Create
app.post("/api/submissions", createLimiter, async (req, res) => {
  try {
    const data = SubmissionCreateSchema.parse(req.body);
    const doc = await SindersSubmission.create(data);
    res.status(201).json({ ok: true, submission: doc });
  } catch (err) {
    console.error(err);
    res.status(400).json({ ok: false, error: err.message });
  }
});

// Read (filter + pagination)
app.get("/api/submissions", async (req, res) => {
  try {
    const q = SubmissionQuerySchema.parse(req.query);

    const filter = {};
    if (q.room) filter.room = q.room;
    if (q.approved) filter.approved = q.approved === "true";
    if (q.hidden) filter.hidden = q.hidden === "true";
    if (q.q) {
      // simple text search
      filter.$text = { $search: q.q };
    }

    const sort = q.sort === "new" ? { createdAt: -1 } : { createdAt: 1 };
    const skip = (q.page - 1) * q.limit;

    const [items, total] = await Promise.all([
      SindersSubmission.find(filter)
        .sort(sort)
        .skip(skip)
        .limit(q.limit)
        .lean(),
      SindersSubmission.countDocuments(filter),
    ]);

    res.json({
      ok: true,
      items,
      total,
      page: q.page,
      pages: Math.ceil(total / q.limit),
    });
  } catch (err) {
    res.status(400).json({ ok: false, error: err.message });
  }
});

// Update (approve/hide, etc.)
app.patch("/api/submissions/:id", async (req, res) => {
  try {
    // You might want admin auth here (you already have a JWT pattern)
    const allowed = ["title", "content", "tags", "approved", "hidden", "room"];
    const updates = Object.fromEntries(
      Object.entries(req.body).filter(([k]) => allowed.includes(k))
    );

    const doc = await SindersSubmission.findByIdAndUpdate(
      req.params.id,
      updates,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!doc) return res.status(404).json({ ok: false, error: "Not found" });
    res.json({ ok: true, submission: doc });
  } catch (err) {
    res.status(400).json({ ok: false, error: err.message });
  }
});

// Delete
app.delete("/api/submissions/:id", async (req, res) => {
  try {
    // Admin auth suggested here too
    const doc = await SindersSubmission.findByIdAndDelete(req.params.id);
    if (!doc) return res.status(404).json({ ok: false, error: "Not found" });
    res.json({ ok: true });
  } catch (err) {
    res.status(400).json({ ok: false, error: err.message });
  }
});

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
