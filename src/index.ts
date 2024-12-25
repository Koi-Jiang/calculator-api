import express from "express";
import { DbHelper } from "./singleton-example";
import { calculator } from "./utils/calculator";
import { showHistory } from "./utils/history";

const app = express();
// port for http
let port = 8000;

if(process.argv.length === 3) {
  port = parseInt(process.argv[2]);
}

DbHelper.init();

app.get("/calculator/add",(req, res) => calculator(req, res, "add"));
app.get("/calculator/subtract",(req, res) => calculator(req, res, "subtract"));
app.get("/calculator/divide",(req, res) => calculator(req, res, "divide"));
app.get("/calculator/multiply",(req, res) => calculator(req, res, "multiply"));
app.get("/calculator/history",(req, res) => showHistory(req, res));

app.listen(port,() => {
  console.log(`Example app listening on port ${port}`)
});

