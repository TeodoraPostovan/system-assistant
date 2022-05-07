import { Request, Response, Router } from 'express';

const router = Router();

router.post('/create', (req: Request, res: Response) => {
  res.send('Hello World!');
});

router.get('/hi', (req: Request, res: Response) => {
  res.send('Hello World!');
});

export default router;
