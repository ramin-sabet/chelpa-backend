"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var Conversation_1 = require("../models/Conversation");
var Chat_1 = require("../models/Chat");
var ConversationController = /** @class */ (function () {
    function ConversationController() {
        this.router = express_1.Router();
        this.routes();
    }
    ConversationController.prototype.getConversations = function (req, res, next) {
        Conversation_1.default.find({ participants: req.params._id })
            .select('_id')
            .exec(function (err, conversations) {
            if (err) {
                res.send({ error: err });
                return next(err);
            }
            // Set up empty array to hold conversations + most recent message
            var fullConversations = [];
            conversations.forEach(function (conversation) {
                Chat_1.default.find({ 'conversationId': conversation._id })
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
    };
    ConversationController.prototype.getConversation = function (req, res, next) {
        Chat_1.default.find({ conversationId: req.params.conversationId })
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
    };
    ConversationController.prototype.sendReply = function (req, res, next) {
        var reply = new Chat_1.default({
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
    };
    ConversationController.prototype.newConversation = function (req, res) {
        if (!req.params.recipient) {
            res.status(422).send({ error: 'Please choose a valid recipient for your message.' });
            // return next();
        }
        if (!req.body.composedMessage) {
            res.status(422).send({ error: 'Please enter a message.' });
            // return next();
        }
        var conversation = new Conversation_1.default({
            participants: [req.body._id, req.params.recipient]
        });
        conversation.save(function (err, newConversation) {
            if (err) {
                res.send({ error: err });
                // return next(err);
            }
            var message = new Chat_1.default({
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
    };
    // set up our routes
    ConversationController.prototype.routes = function () {
        this.router.get('/', this.getConversations);
        this.router.get('/:conversationId', this.getConversation);
        this.router.post('/:conversationId', this.sendReply);
        this.router.post('/new/:recipient', this.newConversation);
    };
    return ConversationController;
}());
var conversationController = new ConversationController();
conversationController.routes();
exports.default = conversationController.router;
//# sourceMappingURL=ConversationController.js.map