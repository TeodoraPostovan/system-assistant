import * as LRU from 'lru-cache';

import { ChatHistoryCollection } from './db/chat-history';

interface MessageStore {
  saveMessage(message: Message): Promise<void>;
  findMessagesForUser(userID: string): Promise<Message[]>;
}

interface Message {
  content: string;
  from: string;
  to: string;
  ts: number;
}

export class InMemoryMessageStore implements MessageStore {
  private messages = new LRU<string, Message[]>({
    max: 500
  });
  private key = 'history';

  constructor() {
    this.messages.set(this.key, []);
  }

  async saveMessage(message: Message) {
    const history = this.messages.get(this.key) || [];
    this.messages.set(this.key, [...history, message]);
  }

  async findMessagesForUser(userID: string) {
    return this.messages.get(this.key).filter(({ from, to }) => from === userID || to === userID);
  }
}

export class MongoMessageStore implements MessageStore {
  private history = new ChatHistoryCollection();

  async saveMessage(message: Message) {
    await this.history.collection.insertOne(message);
  }

  async findMessagesForUser(userID: string) {
    return this.history.collection.find({ $or: [{ from: userID }, { to: userID }] }).toArray() as any;
  }

  // async findMessagesForUser(userID: string) {
  //   return this.history.collection.find({ $or: [{ from: userID }, { to: userID }] }).toArray() as any;
  // }
}
