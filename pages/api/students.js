import { mongooseConnect } from "@/mongo/mongoose";
import { Student } from "@/models/Student";

export default async function handle(req, res) {
  const { method } = req;

  await mongooseConnect();

  // CREATE
  if (method === "POST") {
    const {
      name,
      email,
      phone,
      course,
      qualification,
      institute,
      address,
      images,
    } = req.body;

    try {
      const studentDoc = await Student.create({
        name,
        email,
        phone,
        course,
        address,
        qualification,
        institute,
        images,
      });
      res.status(201).json(studentDoc);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // READ
  if (method === "GET") {
    if (req.query?.id) {
      try {
        const student = await Student.findById(req.query.id);
        res.json(student);
      } catch (error) {
        res.status(404).json({ error: "Student not found" });
      }
    } else {
      const students = await Student.find();
      res.json(students);
    }
  }

  // UPDATE
  if (method === "PUT") {
    const {
      _id,
      name,
      email,
      phone,
      course,
      address,
      qualification,
      institute,
      images,
    } = req.body;

    try {
      await Student.updateOne(
        { _id },
        {
          name,
          email,
          phone,
          course,
          address,
          qualification,
          institute,
          images,
        }
      );
      res.json(true);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // DELETE
  if (method === "DELETE") {
    if (req.query?.id) {
      try {
        await Student.deleteOne({ _id: req.query.id });
        res.json(true);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    } else {
      res.status(400).json({ error: "Student ID not provided" });
    }
  }
}
