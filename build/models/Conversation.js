"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
// tslint:disable object-literal-sort-keys
var ConversationSchema = new mongoose_1.Schema({
    participants: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'User' }],
});
exports.default = mongoose_1.model('Conversation', ConversationSchema);
//# sourceMappingURL=Conversation.js.map