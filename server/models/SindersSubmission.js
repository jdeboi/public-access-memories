const { Schema, model } = require("mongoose");

const SindersSubmissionSchema = new Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 200 },
    content: { type: String, required: true, trim: true, maxlength: 5000 },
    contributor: { type: String, trim: true, maxlength: 200 },
    email: { type: String, trim: true, lowercase: true, maxlength: 250 },
    tags: [{ type: String, trim: true, maxlength: 50 }],
    hidden: { type: Boolean, default: false },
    approved: { type: Boolean, default: false },
    x: { type: Number, min: 0, max: 10000 },
    y: { type: Number, min: 0, max: 10000 },
    url: { type: String, trim: true, maxlength: 1000 },
    artist: { type: String, trim: true, maxlength: 200 },
    isPersonalData: { type: Boolean, default: false },
  },
  { timestamps: true, collection: "sinders" } // <- force exact collection name
);

// 3rd arg also forces the collection name (either approach works)
module.exports = model("SindersSubmission", SindersSubmissionSchema, "sinders");
