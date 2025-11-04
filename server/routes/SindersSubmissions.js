// routes/submissions.js
const express = require("express");
const rateLimit = require("express-rate-limit");
const { z } = require("zod");
const SindersSubmission = require("../models/SindersSubmission");
const adminAuth = require("../middleware/adminAuth");

const router = express.Router();

// --- Validation ---
const SubmissionCreateSchema = z.object({
  title: z.string().min(1).max(200),
  content: z.string().min(1).max(5000),
  artist: z.string().max(200).optional(),
  isPersonalData: z.boolean().optional().default(false),
  url: z.string().max(1000).optional(),
  email: z.string().email().max(250).optional(),
  tags: z.array(z.string().max(50)).optional(),
  contributor: z.string().max(200).optional(),
  x: z.number().min(0).max(10000).nullable().optional(),
  y: z.number().min(0).max(10000).nullable().optional(),
  approved: z.boolean().optional().default(false),
  hidden: z.boolean().optional().default(false),
});

const SubmissionUpdateSchema = z.object({
  title: z.string().min(1).max(200).optional(),
  content: z.string().min(1).max(5000).optional(),
  tags: z.array(z.string().max(50)).optional(),
  approved: z.boolean().optional(),
  hidden: z.boolean().optional(),
  x: z.number().min(0).max(10000).nullable().optional(),
  y: z.number().min(0).max(10000).nullable().optional(),
});

const SubmissionQuerySchema = z.object({
  q: z.string().max(200).optional(),
  approved: z.enum(["true", "false"]).optional(),
  hidden: z.enum(["true", "false"]).optional(),
  limit: z.coerce.number().min(1).max(100).default(50),
  page: z.coerce.number().min(1).default(1),
  sort: z.enum(["new", "old"]).default("new"),
});

// --- Helpers ---
const createLimiter = rateLimit({ windowMs: 60_000, max: 20 });

// --- Routes ---
// Create
router.post("/", createLimiter, async (req, res) => {
  try {
    const data = SubmissionCreateSchema.parse(req.body);
    const doc = await SindersSubmission.create(data);
    return res.status(201).json({ ok: true, item: doc });
  } catch (err) {
    return res.status(400).json({ ok: false, error: err.message });
  }
});

// Read (filter + pagination)
router.get("/", async (req, res) => {
  try {
    const q = SubmissionQuerySchema.parse(req.query);

    const filter = {};
    if (q.approved) filter.approved = q.approved === "true";
    if (q.hidden) filter.hidden = q.hidden === "true";
    if (q.q) filter.$text = { $search: q.q };

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

    return res.json({
      ok: true,
      items,
      total,
      page: q.page,
      pages: Math.ceil(total / q.limit),
    });
  } catch (err) {
    return res.status(400).json({ ok: false, error: err.message });
  }
});

// Update (approve/hide/tags/x/y/etc) — protect with admin
router.patch("/:id", adminAuth, async (req, res) => {
  try {
    const updates = SubmissionUpdateSchema.parse(req.body);
    const doc = await SindersSubmission.findByIdAndUpdate(
      req.params.id,
      updates,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!doc) return res.status(404).json({ ok: false, error: "Not found" });
    return res.json({ ok: true, item: doc });
  } catch (err) {
    return res.status(400).json({ ok: false, error: err.message });
  }
});

// Delete — protect with admin
router.delete("/:id", adminAuth, async (req, res) => {
  try {
    const doc = await SindersSubmission.findByIdAndDelete(req.params.id);
    if (!doc) return res.status(404).json({ ok: false, error: "Not found" });
    return res.json({ ok: true });
  } catch (err) {
    return res.status(400).json({ ok: false, error: err.message });
  }
});

module.exports = router;
