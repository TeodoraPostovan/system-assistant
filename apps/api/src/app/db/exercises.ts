import Mongo from './index';

export class _ExercisesCollection {
  get collection() {
    return Mongo.db.collection('exercises');
  }

  async init() {
    const docs = await this.collection.countDocuments();
    if (docs === 0) {
      const dump = await import('../../assets/exercises.json');
      await this.collection.insertMany(dump.exercises);
      await this.collection.createIndex({ level: 1, category: 1 });
      await this.collection.createIndex({ name: 1 });
    }
  }

  findByExperienceAndGoal(experience: string, goal: string) {
    const levelArr = getExperienceMapping(experience) || [];
    const goalArr = getGoalMapping(goal) || [];

    const query: any = {};
    if (levelArr.length > 0) {
      query.level = { $in: levelArr };
    }
    if (goalArr.length > 0) {
      query.category = { $in: goalArr };
    }

    console.log('query', query);

    return this.collection.find(query).toArray();
  }

  autocompleteSuggestions(query: string) {
    return this.collection.find({ name: { $regex: query, $options: 'i' } }).toArray();
  }
}

export const ExercisesCollection = new _ExercisesCollection();

function getExperienceMapping(experience: string) {
  switch (experience) {
    case 'beginner':
      return ['beginner'];
    case 'intermediate':
      return ['beginner', 'intermediate'];
    case 'expert':
      return ['beginner', 'intermediate', 'expert'];
  }
}

function getGoalMapping(goal: string) {
  switch (goal) {
    case 'maintain':
      return ['stretching', 'cardio', 'strength', 'powerlifting'];
    case 'lose':
      return ['stretching', 'cardio', 'strength', 'crossfit'];
    case 'gain':
      return ['powerlifting', 'stretching', 'weighted_bodyweight', 'assisted_bodyweight'];
  }
}
