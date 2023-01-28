import cors from 'cors';
import express from 'express';
import { Router } from 'express';
import { employeesController } from './controllers/employees.controller';
import { mainController } from './controllers/main.controller';
import EmployeesRoutes from './routes/employees.routes';

class App {
  public app: express.Application;
  public env: string;
  public port: number | string;
  public router = Router();
  public cors = cors();
  public employeesRoutes = new EmployeesRoutes()
  protected initialiseRoutes;
  constructor() {
    this.app = express();
    this.env = process.env.NODE_ENV || 'dev';
    this.port = process.env.PORT || 3001;
    this.initialiseRoutes = this.employeesRoutes.getRoutes()
  }

  private initialMiddleWares() {
    this.app.use(cors());
  }


  private setUpRoutes() {
    this.initialiseRoutes.forEach((route) => {
        this.app.use(route.path, route.config);
      });
  }

  public runServer() {
    this.initialMiddleWares();
    this.setUpRoutes();
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`server is running on port ${this.port}`);
    });
  }
}

export default App;
