import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as express from 'express';
import * as http from 'http';
import { Server, Socket as SocketLib } from 'socket.io';

import userApi from './app/api/user';
import Database from './app/db';

type Socket = SocketLib & {
  sessionID: string;
  // userID: string;
  username: string;
};

import { isLoggedIn } from './app/api/auth.middleware';
import { UsersCollection } from './app/db/user';
import { InMemoryMessageStore, MongoMessageStore } from './app/messageStore';
import { InMemorySessionStore } from './app/sessionStore';
import { randomId } from './app/utils';

const sessionStore = new InMemorySessionStore();
// const messageStore = new InMemoryMessageStore();
const messageStore = new MongoMessageStore();

async function start() {
  const app = express();
  app.use(bodyParser.json());
  app.use(cors());

  const server = http.createServer(app);
  const io = new Server(server, {
    path: '/ws',
    cors: {
      origin: '*',
      methods: ['GET', 'POST']
    }
  });

  app.use('/api/user', userApi);

  app.get('/api', (req, res) => {
    res.send({ message: 'Welcome to api!' });
  });

  io.use((socket: Socket, next) => {
    const sessionID = socket.handshake.auth.sessionID;

    if (sessionID) {
      const session = sessionStore.findSession(sessionID);
      if (session) {
        socket.sessionID = sessionID;
        socket.username = session.username;
        return next();
      }
    }

    const username = socket.handshake.auth.username;
    if (!username) {
      return next(new Error('invalid username'));
    }
    socket.sessionID = randomId();
    socket.username = username;
    next();
  });

  io.on('connection', async (socket: Socket) => {
    const { sessionID, username } = socket;
    // persist session
    sessionStore.saveSession(sessionID, {
      sessionID,
      username,
      connected: true
    });

    socket.emit('session', { sessionID });

    // join the "sessionID" room
    socket.join(sessionID);

    // fetch existing users
    const users = [];
    const messagesPerUser = new Map();

    (await messageStore.findMessagesForUser(sessionID)).forEach((message) => {
      const { from, to } = message;
      const otherUser = sessionID === from ? to : from;
      if (messagesPerUser.has(otherUser)) {
        messagesPerUser.get(otherUser).push(message);
      } else {
        messagesPerUser.set(otherUser, [message]);
      }
    });

    sessionStore
      .findAllSessions()
      .filter((session) => session.sessionID !== sessionID)
      .forEach((session) => {
        users.push({
          ...session,
          messages: messagesPerUser.get(session.sessionID) || []
        });
      });

    socket.emit('users', users);

    // notify existing users
    socket.broadcast.emit('user connected', {
      username: socket.username,
      connected: true,
      messages: [],
      sessionID: socket.sessionID
    });

    // forward the private message to the right recipient (and to other tabs of the sender)
    socket.on('private message', ({ content, to }) => {
      const message = {
        content,
        from: socket.sessionID,
        to,
        ts: Date.now()
      };

      socket.to(to).to(socket.sessionID).emit('private message', message);
      socket.emit('private message', message);
      messageStore.saveMessage(message);
    });

    // notify users upon disconnection
    socket.on('disconnect', async () => {
      const matchingSockets = await io.in(socket.sessionID).allSockets();
      const isDisconnected = matchingSockets.size === 0;
      if (isDisconnected) {
        // notify other users
        socket.broadcast.emit('user disconnected', socket.sessionID);
        // update the connection status of the session
        sessionStore.saveSession(socket.sessionID, {
          sessionID,
          username,
          connected: false
        });
      }
    });

    // socket.on('get history', ({ sessionID }) => {

    // });
  });

  await Database.init();
  Promise.all([UsersCollection.init()]);

  const port = process.env.port || 3333;
  server
    .listen(port, () => {
      console.log(`Listening at http://localhost:${port}`);
    })
    .on('error', console.error);
}

start();
