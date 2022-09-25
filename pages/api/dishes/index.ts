import type { NextApiRequest, NextApiResponse } from "next";
import connectMongo from "../../../controller/connectDB";
import Dish from "../../../models/Dishes";

connectMongo();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const data = await Dish.find({ restaurant: req.body.name });

    res.status(200).json(data);
  } else {
    res.status(404).json({ message: "Invalid API request" });
  }
}
