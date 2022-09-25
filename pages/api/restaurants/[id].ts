import type { NextApiRequest, NextApiResponse } from "next";
import connectMongo from "../../../controller/connectDB";
import Restaurant from "../../../models/Restaurants";

connectMongo;
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  if (req.method === "GET") {
    // const results = await Restaurant.findById(id).exec();
    try {
      const results = await Restaurant.aggregate([
        {
          $search: {
            index: "searchAutofill",
            autocomplete: {
              query: id,
              path: "name",
              fuzzy: {
                maxEdits: 1,
              },
              tokenOrder: "sequential",
            },
          },
        },
        {
          $project: {
            name: 1,
            _id: 1,
          },
        },
        {
          $limit: 10,
        },
      ]);
      res.status(200).json(results);
    } catch (error) {
      console.log(error);
      res.status(404).json({ message: "Error" });
    }
  }
}
