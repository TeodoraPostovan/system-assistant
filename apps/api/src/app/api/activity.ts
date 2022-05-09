import { endOfDay, startOfDay } from 'date-fns';
import { Request, Response, Router } from 'express';
import { serializeError } from 'serialize-error';

import { ActivityCollection } from '../db/activity';
import { UsersCollection } from '../db/user';

const router = Router();

router.post('/save-activity', async (req: Request, res: Response) => {
  try {
    const payload = {
      ts: new Date(req.body.ts),
      data: req.body,
      userId: (req as any).user._id,
      type: req.body.category
    };

    await ActivityCollection.collection.insertOne(payload);
    res.send({ success: true });
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
        sport: [],
        water: []
      }
    );

    res.send({ success: true, results: grouped });
  } catch (error) {
    res.status(500).json({ error: serializeError(error) });
  }
});

export default router;
