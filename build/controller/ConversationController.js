"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var Chat_1 = require("../models/Chat");
var ConversationController = /** @class */ (function () {
    function ConversationController() {
        this.router = express_1.Router();
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
    ConversationController.prototype.getConversation = function (req, res, next) {
        var _id = req.params.conversationId;
        Chat_1.default.findOne({ _id: _id })
            .then(function (data) {
            res.status(200).json({ data: data });
        })
            .catch(function (error) {
            res.status(500).json({ error: error });
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
    };
    ConversationController.prototype.sendReply = function (req, res, next) {
        var _id = req.params.conversationId;
        Chat_1.default.findOneAndUpdate({ "_id": _id }, {
            "$push": {
                body: req.body.composedMessage,
                author: req.body._id
            }
        })
            .then(function (data) {
            res.status(200).json({ data: data });
        })
            .catch(function (error) {
            res.status(500).json({ error: error });
        });
    };
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
    ConversationController.prototype.newConversation = function (req, res) {
        if (!req.body.composedMessage) {
            res.status(422).send({ error: 'Please enter a message.' });
        }
        var chat = new Chat_1.default({
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
    };
    // set up our routes
    ConversationController.prototype.routes = function () {
        // this.router.get('/', this.getConversations);
        this.router.get('/:conversationId', this.getConversation);
        this.router.put('/:conversationId', this.sendReply);
        this.router.post('/', this.newConversation);
    };
    return ConversationController;
}());
var conversationController = new ConversationController();
conversationController.routes();
exports.default = conversationController.router;
//# sourceMappingURL=ConversationController.js.map