"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
// tslint:disable object-literal-sort-keys
var UserSchema = new mongoose_1.Schema({
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    creatorId: {
        type: Number
    },
    from: {
        type: String,
        default: '',
        required: true
    },
    to: {
        type: String,
        default: '',
        required: true
    },
    time: {
        type: String,
        default: '',
        required: true,
    },
    guestNumbers: {
        type: String,
        default: '',
        required: true
    },
    costs: {
        type: Number,
        default: '',
        required: true
    },
    items: [mongoose_1.Schema.Types.Mixed]
});
exports.default = mongoose_1.model('User', UserSchema);
//# sourceMappingURL=Rider.js.map