import EmployeesRoutes from './employees.routes';
import MainRoutes from './main.routes';

export default [
  ...new MainRoutes().getRoutes(),
  ...new EmployeesRoutes().getRoutes(),
];
