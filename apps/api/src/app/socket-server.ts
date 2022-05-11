import * as http from 'http';
import { Server, Socket as SocketLib } from 'socket.io';

import { ChatHistoryCollection } from './db/chat-history';
import { UsersCollection } from './db/user';
import { MongoMessageStore } from './messageStore';

// const sessionStore = new InMemorySessionStore();
// const messageStore = new InMemoryMessageStore();
const messageStore = new MongoMessageStore();

type Socket = SocketLib & {
  sessionID: string;
  role: 'user' | 'coach';
  username: string;
};

export default async function init(server: http.Server) {
  const io = new Server(server, {
    path: '/ws',
    cors: {
      origin: '*',
      methods: ['GET', 'POST']
    }
  });

  io.use((socket: Socket, next) => {
    const { username, sessionID, role } = socket.handshake.auth;

    if (sessionID && username) {
      socket.sessionID = sessionID;
      socket.username = username;
      socket.role = role;
      return next();
    }

    next();
  });

  io.on('connection', async (socket: Socket) => {
    const { sessionID, username, role } = socket;
    socket.join(sessionID);

    const allSockets = (await io.fetchSockets()).map((s: any) => s.sessionID);
    const users = await UsersCollection.collection.find({ role: role === 'coach' ? 'user' : 'coach' }).toArray();
    const usersSafe = users.map(async (u) => {
      const { password, ...rest } = u;

      return {
        ...rest,
        isOnline: allSockets.includes(u._id + ''),
        lastMsg: (
          await ChatHistoryCollection.collection
            .find({ $or: [{ from: u._id + '' }, { to: u._id + '' }] })
            .sort({ ts: -1 })
            .limit(1)
            .toArray()
        )[0]
      };
    });

    socket.emit('users', await Promise.all(usersSafe));

    // notify existing users
    socket.broadcast.emit('user connected', sessionID);

    // forward the private message to the right recipient (and to other tabs of the sender)
    socket.on('private message', async ({ content, to }) => {
      const message = {
        content,
        from: sessionID,
        to,
        ts: Date.now(),
        _id: null
      };

      const { insertedId } = await messageStore.saveMessage(message);
      message._id = insertedId;
      socket.to(to).emit('private message', message);
      socket.emit('private message', message);
    });

    socket.on('get history', async (id: string) => {
      const messages = await ChatHistoryCollection.collection.find({ $or: [{ from: id }, { to: id }] }).toArray();
      socket.emit('get history response', messages);
    });

    // notify users upon disconnection
    socket.on('disconnect', async () => {
      const matchingSockets = await io.in(socket.sessionID).allSockets();
      const isDisconnected = matchingSockets.size === 0;
      if (isDisconnected) {
        // notify other users
        socket.broadcast.emit('user disconnected', sessionID);
      }
    });

    // socket.on('get history', ({ sessionID }) => {

    // });
  });
}
