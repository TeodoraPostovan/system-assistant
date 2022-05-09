import { Request, Response, Router } from 'express';
import { serializeError } from 'serialize-error';

import { RecommendationCollection } from '../db/recommendation';
import { UsersCollection } from '../db/user';

const router = Router();

router.post('/save-survey', async (req: Request, res: Response) => {
  try {
    const { email, surveyData } = req.body;
    const userInfo = (req as any).user;
    await UsersCollection.collection.updateOne({ email }, { $set: { surveyData } });
    RecommendationCollection.collection.deleteMany({ userId: userInfo._id });
    res.json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: serializeError(error) });
  }
});

router.get('/me', async (req: Request, res: Response) => {
  try {
    const { email } = (req as any).user;
    const user = await UsersCollection.collection.findOne({ email });
    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ error: serializeError(error) });
  }
});

router.get('/get-coaches', async (req: Request, res: Response) => {
  try {
    const users = await UsersCollection.collection.find({ role: 'coach' }).toArray();
    const usersSafe = users.map((u) => {
      const { password, ...rest } = u;
      return rest;
    });

    res.json({ success: true, users: usersSafe });
  } catch (error) {
    res.status(500).json({ error: serializeError(error) });
  }
});

export default router;
