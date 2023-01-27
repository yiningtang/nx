import express from 'express';
import { Request, Response } from "express";
const cors = require('cors');
const port = process.env.PORT ? Number(process.env.PORT) : 3001;
import { EMPLOYEES } from '@org-react-node/shared-utils';
const app = express();

app.get('/', (_req, res) => {
  res.send({ message: 'Hello API' });
});

app.use(cors());

app.use("/employees", (req_:Request, res: Response) => {
  res.send(EMPLOYEES);
});

app.listen(port, () => {
  console.log(`[ ready ] http://localhost:${port}`);
});
