import { EMPLOYEES } from '@org-react-node/shared-utils';
import { Request, Response } from 'express';

export const employeeController = (req: Request, res: Response) => {
  const {employeeId} = req.params;
  const employee = EMPLOYEES.find(emp => emp.id === employeeId);
  res.json(employee||{});
};
