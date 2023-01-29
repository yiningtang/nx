import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { Router } from 'express';
import EmployeesRoutes from './routes/employees.routes';

class App {
  public app: express.Application;
  public env: string;
  public port: number | string;
  public router = Router();
  public cors = cors();
  public employeesRoutes = new EmployeesRoutes()
  public initialiseRoutes: Router[];
  constructor(routes: Router[]) {
    this.app = express();
    this.env = process.env.NODE_ENV || 'dev';
    this.port = process.env.PORT || 3001;
    this.initialiseRoutes = routes || [];
  }

  private initialMiddleWares() {
    this.app.use(cors());
    this.app.use(helmet());
  }


  private setUpRoutes() {
    this.initialiseRoutes.forEach((route) => {
        this.app.use(route);
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
