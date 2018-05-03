import { Request, Response, Router } from 'express';
import Chat from '../models/Chat';
import User from '../models/User'
import { text } from 'body-parser';


class ConversationController {

    public router: Router;


    constructor() {
        this.router = Router();
        this.routes();
    }

    // public getConversations(req: Request, res: Response, next) {
    //     Chat.find({ _id: req.params._id })
    //         .select('_id')
    //         .exec(function (err, conversations) {
    //             if (err) {
    //                 res.send({ error: err });
    //                 return next(err);
    //             }

    //             // Set up empty array to hold conversations + most recent message
    //             let fullConversations = [];
    //             conversations.forEach(function (conversation) {
    //                 Chat.find({ 'conversationId': conversation._id })
    //                     .sort('-createdAt')
    //                     .limit(1)
    //                     .populate({
    //                         path: "author",
    //                         select: "profile.firstName profile.lastName"
    //                     })
    //                     .exec(function (err, message) {
    //                         if (err) {
    //                             res.send({ error: err });
    //                             return next(err);
    //                         }
    //                         fullConversations.push(message);
    //                         if (fullConversations.length === conversations.length) {
    //                             return res.status(200).json({ conversations: fullConversations });
    //                         }
    //                     });
    //             });
    //         });
    // }

    public getConversation(req: Request, res: Response, next) {
        const _id: string = req.params.conversationId;
        Chat.findOne({ _id })
            .then((data) => {
                res.status(200).json({ data });
            })
            .catch((error) => {
                res.status(500).json({ error });
            });
        // .select('createdAt body author')
        // .sort('-createdAt')
        // .populate({
        //     path: 'author',
        //     select: 'profile.firstName profile.lastName'
        // })
        // .exec(function (err, messages) {
        //     if (err) {
        //         res.send({ error: err });
        //         return next(err);
        //     }

        //     res.status(200).json({ conversation: messages });
        // });
    }

    public sendReply(req: Request, res: Response, next) {
        const _id: string = req.params.conversationId;

        Chat.findOneAndUpdate({ "_id": _id }, {
            "$push": {
                body: req.body.composedMessage,
                author: req.body._id
            }
        })
            .then((data) => {
                res.status(200).json({ data });
            })
            .catch((error) => {
                res.status(500).json({ error });
            });
    }
    // {
    //     const chat = new Chat({
    //         conversationId: req.params.conversationId,
    //         body: req.body.composedMessage,
    //         author: req.body._id
    //     });

    //     chat.save(function (err, sentReply) {
    //         if (err) {
    //             res.send({ error: err });
    //             return next(err);
    //         }

    //         res.status(200).json({ message: 'Reply successfully sent!' });
    //         return (next);
    //     });
    // }

    public newConversation(req: Request, res: Response) {

        if (!req.body.composedMessage) {
            res.status(422).send({ error: 'Please enter a message.' });
        }

        const chat = new Chat({
            participant1: req.body.participant1,
            participant2: req.body.participant2,
            body: req.body.composedMessage,
        });

        chat.save(function (err, newConversation) {
            if (err) {
                res.send({ error: err });
                // return next(err);
            }
            res.status(200).json({ message: 'Conversation started!', conversationId: chat._id });
        });

    }


    // set up our routes
    public routes() {
        // this.router.get('/', this.getConversations);
        this.router.get('/:conversationId', this.getConversation);
        this.router.put('/:conversationId', this.sendReply);
        this.router.post('/', this.newConversation);
    }

}

const conversationController = new ConversationController();
conversationController.routes();

export default conversationController.router;
