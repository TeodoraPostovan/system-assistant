import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as express from 'express';
import * as fileUpload from 'express-fileupload';
import * as http from 'http';
import * as path from 'path';

import activityApi from './app/api/activity';
import authApi from './app/api/auth';
import { isLoggedIn } from './app/api/auth.middleware';
import exerciseApi from './app/api/exercises';
import recipesApi from './app/api/recipes';
import userApi from './app/api/user';
import Database from './app/db';
import { ExercisesCollection } from './app/db/exercises';
import { UsersCollection } from './app/db/user';
import socketServer from './app/socket-server';

async function start() {
  const app = express();
  app.use(bodyParser.json());
  app.use(cors());
  app.use(
    fileUpload({
      preserveExtension: true,
      tempFileDir: '/tmp/fileupload'
    })
  );

  const server = http.createServer(app);
  await socketServer(server);

  app.use('/static', express.static(path.join(__dirname, 'assets')));
  app.use('/api/auth', authApi);
  app.use('/api/user', isLoggedIn, userApi);
  app.use('/api/activity', isLoggedIn, activityApi);
  app.use('/api/recipe', isLoggedIn, recipesApi);
  app.use('/api/exercise', isLoggedIn, exerciseApi);

  app.get('/api', (req, res) => {
    res.send({ message: 'Welcome to api!' });
  });

  await Database.init();
  Promise.all([UsersCollection.init(), ExercisesCollection.init()]);

  const port = process.env.port || 3333;
  server
    .listen(port, () => {
      console.log(`Listening at http://localhost:${port}`);
    })
    .on('error', console.error);
}

start();
