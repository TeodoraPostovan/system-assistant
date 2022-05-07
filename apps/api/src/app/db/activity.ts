import Mongo from './index';

export class ActivityCollection {
  private get collection() {
    return Mongo.db.collection('activity');
  }

  async add(user: any) {
    await this.collection.insertOne(user);
  }
}
