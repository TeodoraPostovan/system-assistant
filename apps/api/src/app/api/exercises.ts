import { endOfDay, startOfDay } from 'date-fns';
import { Request, Response, Router } from 'express';
import { serializeError } from 'serialize-error';

import { ActivityCollection } from '../db/activity';
import { ExercisesCollection } from '../db/exercises';
// import { ExercisesCollection } from '../db/user';

const router = Router();

router.get('/recommendations', async (req: Request, res: Response) => {
  try {
    const userInfo = (req as any).user;
    const { experience, goal } = userInfo.surveyData || {};

    const results = await ExercisesCollection.findByExperienceAndGoal(experience, goal);
    res.send(results);
  } catch (error) {
    res.status(500).json({ error: serializeError(error) });
  }
});

router.get('/get', async (req: Request, res: Response) => {
  try {
    const ts = +req.query.ts;

    const results = await ActivityCollection.collection
      .find({
        ts: {
          $gte: startOfDay(ts),
          $lte: endOfDay(ts)
        },
        userId: (req as any).user._id
      })
      .toArray();

    const grouped = results.reduce(
      (acc, curr) => {
        acc[curr.type].push(curr);
        return acc;
      },
      {
        meal: [],
        sport: []
      }
    );

    res.send({ success: true, results: grouped });
  } catch (error) {
    res.status(500).json({ error: serializeError(error) });
  }
});

export default router;
