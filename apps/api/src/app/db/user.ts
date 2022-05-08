import Mongo from './index';

class _UsersCollection {
  get collection() {
    return Mongo.db.collection('users');
  }

  async add(user: any) {
    await this.collection.insertOne(user);
  }

  findCoaches() {
    return this.collection.find({ role: 'coach' }).toArray();
  }

  async init() {
    try {
      await this.collection.createIndex({ email: 1 }, { unique: true });
    } catch (error) {
      console.log('already exists');
    }
  }
}

export const UsersCollection = new _UsersCollection();
