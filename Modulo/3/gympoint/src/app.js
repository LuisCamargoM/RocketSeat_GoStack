import express from 'express';
import routes from './routes';

import './database';

require('dotenv/config');

class App {
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(express.json()); // Define que a aplicaçao pode ler JSON
  }

  routes() {
    this.server.use(routes);
  }
}

export default new App().server;
