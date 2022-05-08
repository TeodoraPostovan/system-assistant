import * as crypto from 'crypto';
import { Request, Response, Router } from 'express';
import * as jwt from 'jsonwebtoken';
import { serializeError } from 'serialize-error';

import { environment } from '../../environments/environment';
import { UsersCollection } from '../db/user';

const router = Router();

router.post('/register', async (req: Request, res: Response) => {
  try {
    const hash = crypto.createHash('sha256').update(req.body.password);
    const hashedPassword = hash.digest('hex');
    // hash the password
    req.body.password = hashedPassword;
    // create a new user
    await UsersCollection.collection.insertOne(req.body);
    const { password, ...rest } = req.body;
    const token = await jwt.sign(rest, environment.SECRET);
    // send new user as response
    res.send({ token, user: rest });
  } catch (error) {
    res.status(500).json({ error: serializeError(error) });
  }
});

router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await UsersCollection.collection.findOne({ email });
    if (user) {
      const hash = crypto.createHash('sha256').update(password);
      const hashedPassword = hash.digest('hex');
      if (hashedPassword === user.password) {
        const { password, ...rest } = user;
        const token = await jwt.sign(rest, environment.SECRET);
        res.send({ token, user: rest });
      } else {
        res.status(401).send({ error: 'Invalid username or password' });
      }
    } else {
      res.status(400).json({ error: "User doesn't exist" });
    }
  } catch (error) {
    res.status(500).json({ error: serializeError(error) });
  }
});

export default router;