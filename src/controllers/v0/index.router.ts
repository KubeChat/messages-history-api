import { Router, Request, Response } from 'express';
import { MessagesRouter } from './messages/routes/messages.router';

const router: Router = Router();

router.use('/messages', MessagesRouter);

router.get('/', async (req: Request, res: Response) => {    
    res.send(`V0`);
});

export const IndexRouter: Router = router;