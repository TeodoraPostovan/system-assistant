import Mongo from './index';

export class _RecommendationCollection {
  get collection() {
    return Mongo.db.collection('recommendations');
  }
}

export const RecommendationCollection = new _RecommendationCollection();
