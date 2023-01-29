import { Router } from 'express';
import { employeeController } from '../controllers/employee.controller';
import { employeesController } from '../controllers/employees.controller';

export default class EmployeesRoutes {
  private router: Router = Router();
  public getRoutes(): Router[] {
    return [
     this.router.get(`/employees`, employeesController),
     this.router.get(`/employees/:employeeId`, employeeController),
    ];
  }
}
