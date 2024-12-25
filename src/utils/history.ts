import { Response } from "express";
import { Request } from "express";
import { DbHelper } from "../singleton-example";

export async function showHistory(req: Request, res: Response): Promise<void> {
  const op = req.query.op;
  let query = {};

  if (validOperations.includes(op as any)) {
    query = {op: op};
  }

  const collection = await DbHelper.getCollection();

  const history = await collection.find(query).toArray();
  res.status(200).send(history);
}
