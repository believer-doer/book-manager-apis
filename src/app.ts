import express, {NextFunction, Request, Response} from 'express';
import helmet from 'helmet';
import * as swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger.json';
import BookManagerService from './books-manager/books.manager.service.ts';
import BookManagerController from './books-manager/books-manager.controller';

class App {
  public express: express.Application;
  constructor() {
    this.express = express();
    this.middleware();
    this.routes();
  }

  private middleware(): void {
    this.express.use(express.json());
    this.express.use(express.urlencoded({extended: false}));
    this.express.use(helmet());
  }

  private routes(): void {
    const app = this.express;

    const bookManagerService = new BookManagerService();
    const bookManagerController = new BookManagerController(bookManagerService);

    app.use('/', bookManagerController.app);

    app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
      // eslint-disable-next-line no-console
      console.error(err.message);
    });

    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  }
}

export default new App().express;
