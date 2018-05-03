"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
// tslint:disable object-literal-sort-keys
var ChatSchema = new mongoose_1.Schema({
    createdAt: {
        type: Date,
        default: Date.now
    },
    participant1: {
        type: String,
        required: true
    },
    participant2: {
        type: String,
        required: true
    },
    body: [{
            type: String,
            required: true
        }]
});
exports.default = mongoose_1.model('Chat', ChatSchema);
//# sourceMappingURL=Chat.js.map