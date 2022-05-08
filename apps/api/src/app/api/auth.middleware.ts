import { Request, Response, Router } from 'express';
import * as jwt from 'jsonwebtoken';

import { environment } from '../../environments/environment';

export async function isLoggedIn(req: Request, res: Response, next) {
  try {
    // check if auth header exists
    if (req.headers.authorization) {
      // parse token from header
      const token = req.headers.authorization.split(' ')[1]; //split the header and get the token
      if (token) {
        const payload = await jwt.verify(token, environment.SECRET);
        if (payload) {
          // store user data in request object
          (req as any).user = payload;
          next();
        } else {
          res.status(400).json({ error: 'token verification failed' });
        }
      } else {
        res.status(400).json({ error: 'malformed auth header' });
      }
    } else {
      res.status(400).json({ error: 'No authorization header' });
    }
  } catch (error) {
    res.status(400).json({ error });
  }
}
