import Mongo from './index';

export class _ChatHistoryCollection {
  get collection() {
    return Mongo.db.collection('chat-history');
  }
}

export const ChatHistoryCollection = new _ChatHistoryCollection();
