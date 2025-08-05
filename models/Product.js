const { Schema, models, model } = require("mongoose");

const ProductSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: {
    type: Number,
    required: true,
    set: (v) => parseFloat(v),
  },
  images: [{ type: String }],
  duration: { type: String }, // e.g., "2 months"
  topics: [String], // ["Intro", "Ethical Hacking", ...]
  shedule: [String],
  tools: [{ type: String }],
  prerequisites: { type: String },
  format: { type: String }, // "Live", "Recorded", "Hybrid"
  certificate: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});

export const Product = models.Product || model("Product", ProductSchema);
