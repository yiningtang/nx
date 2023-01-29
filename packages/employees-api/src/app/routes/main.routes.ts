import { Router } from 'express';
import { mainController } from '../controllers/main.controller';

export default class MainRoutes {
  private router = Router();
  getRoutes(): Router[] {
    return [
        this.router.get(`/`, mainController)
    ];
  }
}
