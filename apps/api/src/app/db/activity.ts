import Mongo from './index';

export class _ActivityCollection {
  get collection() {
    return Mongo.db.collection('activity');
  }

  async add(user: any) {
    await this.collection.insertOne(user);
  }
}

export const ActivityCollection = new _ActivityCollection();
