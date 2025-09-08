// Ruta: src/api/infrastructure/adapter/server/Server.ts

import express, { Application } from 'express';
import AbstractRouter from '../../../../domain/model/AbstractRouter';
import ServerProvider from '../provider/ServerProvider';

export default class Server {
  private readonly app: Application;
  private readonly port: number;
  private readonly host: string;

  constructor(
    private readonly serverProvider: ServerProvider,
    private readonly routers: AbstractRouter[]
  ) {
    this.app = express();
    this.port = this.serverProvider.getPort();
    this.host = this.serverProvider.getHost();

    this.configure();
    this.attachRouters();
  }

  private configure(): void {
    // Middlewares para que Express pueda entender JSON en las peticiones
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  private attachRouters(): void {
    // Recorre todos los routers y los "adjunta" a la aplicación de Express
    this.routers.forEach((router) => {
      router.attach(this.app);
    });
  }

  public start(): void {
    this.app.listen(this.port, this.host, () => {
      console.log(`🚀 Server is running on http://${this.host}:${this.port}`);
    });
  }
}