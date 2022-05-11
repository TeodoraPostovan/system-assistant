import { Request, Response, Router } from 'express';
import * as fs from 'fs';
import * as fsExtra from 'fs-extra';
import * as path from 'path';
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
    const { password, ...rest } = user;
    res.json({ success: true, user: rest });
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

const FILE_UPLOAD_LOCATION = path.resolve(process.cwd(), 'dist/apps/api/assets/file-uploads');
fsExtra.ensureDirSync(FILE_UPLOAD_LOCATION);

router.post('/upload-photo', async (req: Request, res: Response) => {
  try {
    if (!(req as any).files || Object.keys((req as any).files).length === 0) {
      return res.status(400).send('No files were uploaded.');
    }

    const photo = (req as any).files.photo;
    // const uploadPath = path.join(__dirname, '../../../file-uploads/');
    const uploadPathFull = path.join(FILE_UPLOAD_LOCATION, photo.name);

    photo.mv(uploadPathFull, async (err) => {
      if (err) {
        return res.status(500).send(err);
      }

      const userInfo = (req as any).user;
      const { email } = userInfo;
      const relativeLocation = `/static/file-uploads/${photo.name}`;
      await UsersCollection.collection.updateOne({ email }, { $set: { avatar: relativeLocation } });
      res.json({ success: true, path: relativeLocation });
    });
  } catch (error) {
    res.status(500).json({ error: serializeError(error) });
  }
});

export default router;
