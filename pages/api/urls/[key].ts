import awsHelper from "../../../controller/awsURL";
import type { NextApiRequest, NextApiResponse } from "next";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { key } = req.query;
 
  if(req.method === "GET") {
    const url = await awsHelper(key as string);

    res.status(200).json({ url: url});
  }else{
    res.status(404).json({ message: 'invalid request'});
  }
}
