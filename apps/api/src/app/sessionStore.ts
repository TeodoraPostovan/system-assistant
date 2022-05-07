interface SessionStore {
  findSession(id: string): Session;
  saveSession(id: string, session: Session): void;
  findAllSessions(): Session[];
}

interface Session {
  sessionID: string;
  username: string;
  connected: boolean;
}

export class InMemorySessionStore implements SessionStore {
  private sessions = new Map<string, Session>();

  findSession(id: string) {
    return this.sessions.get(id);
  }

  saveSession(id: string, session: Session) {
    this.sessions.set(id, session);
  }

  findAllSessions() {
    return [...this.sessions.values()];
  }
}
