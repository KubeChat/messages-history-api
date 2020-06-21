import { Router, Request, Response } from 'express';
import { MessagesRouter } from './messages-history/routes/messages-history.router';

const router: Router = Router();

router.use('/messages-history', MessagesRouter);

router.get('/', async (req: Request, res: Response) => {    
    res.send(`V0`);
});

export const IndexRouter: Router = router;