import Mongo from './index';

export class ChatHistoryCollection {
  get collection() {
    return Mongo.db.collection('chat-history');
  }
}
