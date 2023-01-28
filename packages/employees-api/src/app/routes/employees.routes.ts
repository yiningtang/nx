import { Router } from 'express';
import { employeesController } from '../controllers/employees.controller';
import { mainController } from '../controllers/main.controller';

export default class EmployeesRoutes {
  private router: Router = Router();
  public getRoutes() {
    return [
      {
        path: '/',
        config: this.router.get(`/`, mainController),
      },
      {
        path: '/employees',
        config: this.router.get(`/employees`, employeesController),
      },
    ];
  }
}
