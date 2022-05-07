import Mongo from './index';

export class UsersCollection {
  private get collection() {
    return Mongo.db.collection('users');
  }

  async add(user: any) {
    await this.collection.insertOne(user);
  }
}
