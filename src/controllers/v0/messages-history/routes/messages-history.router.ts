import { Router, Request, Response } from 'express';
import { Message } from '../models/Message';
import { getGetSignedUrl, getPutSignedUrl } from '../data/attachmentsBucket';
import { verifyToken } from '../../../../middlewares/jwt';
import { MessagesDao } from '../data/MessagesDao';

const router: Router = Router();
const messagesDao = new MessagesDao();

router.get('/:id', verifyToken, async (req: any, res: Response) => {
    const email = req.user.email;
    const otherEmail = req.params.id;
    const channelId = [email, otherEmail].sort().join();
    const messages: Message[] = await messagesDao.getMessagesOfChannel(channelId);
    res.status(200).send(messages.map(message => {
        return {
            text: message.text,
            attachmentUrl: getGetSignedUrl(message.attachmentUrl),
            mine: message.from === email
        }
    }));
});


router.get('/signed-url/:fileName', verifyToken, async (req: Request, res: Response) => {
    const fileName = req.params.fileName;
    const url = getPutSignedUrl(fileName);
    res.status(201).send({url});
});

router.post('/', verifyToken, async (req: any, res: Response) => {
    const { to, text, fileName } = req.body;
    const from = req.user.email;

    if (!to) {
        return res.status(400).send({ message: 'receiver email is required' });
    }

    if (!text && !fileName) {
        return res.status(400).send({ message: 'message content is required' });
    }

    const channelId = [from, to].sort().join();
    const attachmentUrl = fileName
    const timestamp = new Date().getTime();

    const message: Message = {channelId, text, attachmentUrl, timestamp, from}

    await messagesDao.addMessage(message);

    res.status(201).send(message);
});

export const MessagesRouter: Router = router;