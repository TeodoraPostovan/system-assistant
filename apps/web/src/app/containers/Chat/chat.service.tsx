import { io, Socket as SocketLib } from 'socket.io-client';

type Socket = SocketLib & {
  sessionID: string;
  userID: string;
  username: string;
};

class _SocketManager {
  private initCalls = 0;
  client = io('http://localhost:3333', {
    path: '/ws',
    autoConnect: false,
    // auth: {
    //   sessionID: this.getSession(),
    //   username: 'test'
    // },
    transports: ['websocket']
  }) as Socket;

  private getSession() {
    return localStorage.getItem('session');
  }

  close() {
    this.client.close();
  }

  connect() {
    return this.init();
  }

  private async init() {
    if (this.initCalls > 0) {
      return;
    }
    this.initCalls++;

    this.client.on('session', ({ sessionID, userID }) => {
      // attach the session ID to the next reconnection attempts
      this.client.auth = { sessionID };
      // store it in the localStorage
      localStorage.setItem('session', sessionID);
      // save the ID of the user
      this.client.userID = userID;
    });

    const p = new Promise((resolve, reject) => {
      // this.client.on('users', resolve);
      this.client.on('connect', resolve as any);
    });

    this.client.connect();
    return p;
  }

  sendMessage(to: string, content: string) {
    this.client.emit('private message', { to, content });
  }

  onMessage(cb: (ev: any) => void) {
    this.client.on('private message', cb);
    return () => this.client.off('private message', cb);
  }
}

const socket = new _SocketManager();
export default socket;
