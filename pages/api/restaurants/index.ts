import type { NextApiRequest, NextApiResponse } from "next";
import connectMongo from "../../../controller/connectDB";
import Restaurant from "../../../models/Restaurants";

connectMongo();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const data = await Restaurant.find();

      res.status(200).json(data);
    } catch (err) {
      console.log(err);
      res.status(500).json({message: "Error"});
    }
  } else if (req.method === "POST") {
    await Restaurant.create({ name: req.body.name });
    res.status(200).json({ message: "added restaurant" });
  } else {
    res.status(404).json({ message: "Invalid API request" });
  }
}
