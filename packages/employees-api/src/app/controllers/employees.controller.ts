import { EMPLOYEES } from '@org-react-node/shared-utils';
import { Request, Response } from 'express';

export const employeesController = (_req: Request, res: Response) => {
  res.json(EMPLOYEES);
};
