import { MongoClient } from 'mongodb';

const uri = 'mongodb://localhost:27017/db';

class _DB {
  private client = new MongoClient(uri);

  get db() {
    return this.client.db('db');
  }

  async init() {
    await this.client.connect();
  }
}

const instance = new _DB();
export default instance;
