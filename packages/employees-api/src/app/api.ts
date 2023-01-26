import { Request, Response } from "express";
const express = require("express");
const app = express();
const port = 3001;
const cors = require('cors');


const EMPLOYEES = require("@org-react-node/employees");

app.use(cors());

app.use("/employees", (req_:Request, res: Response) => {
  res.send(EMPLOYEES);
});

app.listen(port, () => {
  console.log(`port ${port} is running`);
});
