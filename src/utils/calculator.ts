import { Response } from "express";
import { Request } from "express";
import { DbHelper } from "../singleton-example";
 
export async function calculator(req: Request, res: Response, operation: OperationType): Promise<void> {
  const a = req.query.a;
  const b = req.query.b;
  
  if (!a || !b) {
    res.send(400);
    return;
  }
  
  const p = parseFloat(a as string);
  const q = parseFloat(b as string);
  if (isNaN(p) || isNaN(q)) {
    res.send(400);
    return;
  }

  let result: number;

  switch(operation) {
    case "add":
      result = p+q;
      break;
    case "subtract":
      result = p-q;
      break;
    case "divide":
      result = p/q;
      break;
    case "multiply":
      result = p*q;
      break;
  }

  const doc = { a: p, b: q, op: operation, result: result }

  const collection = await DbHelper.getCollection();

  await collection.insertOne(doc);
  res.status(200).send(result.toString());
} 
