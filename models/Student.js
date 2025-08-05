const { Schema, models, model } = require("mongoose");

const StudentSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  course: { type: String },
  address: { type: String },
  registeredAt: { type: Date, default: Date.now },
  images: [{ type: String }],
  qualification: { type: String },
  institute: { type: String },
});

export const Student = models.Student || model("Student", StudentSchema);
