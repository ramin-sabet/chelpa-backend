import { Request, Response, Router } from 'express';
import Conversation from '../models/Conversation';
import Chat from '../models/Chat';
import User from '../models/User'
import { text } from 'body-parser';


class ConversationController {

    public router: Router;


    constructor() {
        this.router = Router();
        this.routes();
    }

    public getConversations(req: Request, res: Response, next) {
        Conversation.find({ participants: req.params._id })
            .select('_id')
            .exec(function (err, conversations) {
                if (err) {
                    res.send({ error: err });
                    return next(err);
                }

                // Set up empty array to hold conversations + most recent message
                let fullConversations = [];
                conversations.forEach(function (conversation) {
                    Chat.find({ 'conversationId': conversation._id })
                        .sort('-createdAt')
                        .limit(1)
                        .populate({
                            path: "author",
                            select: "profile.firstName profile.lastName"
                        })
                        .exec(function (err, message) {
                            if (err) {
                                res.send({ error: err });
                                return next(err);
                            }
                            fullConversations.push(message);
                            if (fullConversations.length === conversations.length) {
                                return res.status(200).json({ conversations: fullConversations });
                            }
                        });
                });
            });
    }

    public getConversation(req: Request, res: Response, next) {
        Chat.find({ conversationId: req.params.conversationId })
            .select('createdAt body author')
            .sort('-createdAt')
            .populate({
                path: 'author',
                select: 'profile.firstName profile.lastName'
            })
            .exec(function (err, messages) {
                if (err) {
                    res.send({ error: err });
                    return next(err);
                }

                res.status(200).json({ conversation: messages });
            });
    }

    public sendReply(req: Request, res: Response, next) {
        const reply = new Chat({
            conversationId: req.params.conversationId,
            body: req.body.composedMessage,
            author: req.params._id
        });

        reply.save(function (err, sentReply) {
            if (err) {
                res.send({ error: err });
                return next(err);
            }

            res.status(200).json({ message: 'Reply successfully sent!' });
            return (next);
        });
    }

    public newConversation(req: Request, res: Response) {
        if (!req.params.recipient) {
            res.status(422).send({ error: 'Please choose a valid recipient for your message.' });
            // return next();
        }

        if (!req.body.composedMessage) {
            res.status(422).send({ error: 'Please enter a message.' });
            // return next();
        }

        const conversation = new Conversation({
            participants: [req.body._id, req.params.recipient]
        });

        conversation.save(function (err, newConversation) {
            if (err) {
                res.send({ error: err });
                // return next(err);
            }

            const message = new Chat({
                conversationId: newConversation._id,
                body: req.body.composedMessage,
                author: req.body._id
            });

            message.save(function (err, newMessage) {
                if (err) {
                    res.send({ error: err });
                    // return next(err);
                }

                res.status(200).json({ message: 'Conversation started!', conversationId: conversation._id });
                // return next();
            });
        });

    }


    // set up our routes
    public routes() {
        this.router.get('/', this.getConversations);
        this.router.get('/:conversationId', this.getConversation);
        this.router.post('/:conversationId', this.sendReply);
        this.router.post('/new/:recipient', this.newConversation)
    }

}

const conversationController = new ConversationController();
conversationController.routes();

export default conversationController.router;
