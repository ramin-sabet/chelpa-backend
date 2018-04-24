"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
// tslint:disable object-literal-sort-keys
var ChatSchema = new mongoose_1.Schema({
    createdAt: {
        type: Date,
        default: Date.now
    },
    conversationId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    author: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User'
    }
});
exports.default = mongoose_1.model('Chat', ChatSchema);
//# sourceMappingURL=Chat.js.map