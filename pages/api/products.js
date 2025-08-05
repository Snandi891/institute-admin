import { mongooseConnect } from "@/mongo/mongoose";
import { Product } from "@/models/Product";

export default async function handle(req, res) {
  const { method } = req;

  await mongooseConnect();

  if (method === "POST") {
    const {
      title,
      description,
      price,
      images,
      duration,
      topics,
      tools,
      shedule,
      prerequisites,
      format,
      certificate,
    } = req.body;

    const productDoc = await Product.create({
      title,
      description,
      price,
      images,
      duration,
      shedule,
      topics,
      tools,
      prerequisites,
      format,
      certificate,
    });

    res.json(productDoc);
  }

  if (method === "GET") {
    if (req.query?.id) {
      res.json(await Product.findById(req.query.id));
    } else {
      res.json(await Product.find());
    }
  }

  if (method === "PUT") {
    const {
      _id,
      title,
      description,
      price,
      images,
      duration,
      shedule,
      topics,
      tools,
      prerequisites,
      format,
      certificate,
    } = req.body;

    await Product.updateOne(
      { _id },
      {
        title,
        description,
        price,
        images,
        shedule,
        duration,
        topics,
        tools,
        prerequisites,
        format,
        certificate,
      }
    );
    res.json(true);
  }

  if (method === "DELETE") {
    if (req.query?.id) {
      await Product.deleteOne({ _id: req.query?.id });
      res.json(true);
    }
  }
}
