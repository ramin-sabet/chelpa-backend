"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
// tslint:disable object-literal-sort-keys
var OptionSchema = new mongoose_1.Schema({
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    name: {
        type: String,
        default: '',
        required: true
    }
});
exports.default = mongoose_1.model('Option', OptionSchema);
//# sourceMappingURL=Option.js.map