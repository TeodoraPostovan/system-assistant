import { eachDayOfInterval, endOfDay, endOfWeek, startOfDay, startOfWeek, subDays } from 'date-fns';
import { zonedTimeToUtc } from 'date-fns-tz';

import Mongo from './index';

export class _ActivityCollection {
  get collection() {
    return Mongo.db.collection('activity');
  }

  async getWeeklyMetrics(userId: string, ts: number) {
    const start = zonedTimeToUtc(subDays(startOfDay(ts), 7), 'UTC');
    const end = zonedTimeToUtc(endOfDay(ts), 'UTC');
    const results = await this.collection
      .find({
        ts: {
          $gte: start,
          $lte: end
        },
        userId
      })
      .toArray();

    const intervalRange = eachDayOfInterval({ start: subDays(ts, 6), end: zonedTimeToUtc(subDays(ts, 1), 'UTC') }).map(
      (d) => zonedTimeToUtc(d, 'UTC')
    );

    const dateMap = intervalRange.reduce((acc, date) => {
      acc[+date] = [];
      return acc;
    }, {});

    return results.reduce((acc, result) => {
      const ts = +new Date(result.ts);
      const date = +zonedTimeToUtc(startOfDay(ts), 'UTC');
      acc[date] = acc[date] || [];
      acc[date].push(result);

      return acc;
    }, dateMap);
  }
}

export const ActivityCollection = new _ActivityCollection();
