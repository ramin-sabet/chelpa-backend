"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
// tslint:disable object-literal-sort-keys
var TripSchema = new mongoose_1.Schema({
    createdAt: {
        type: Date,
        default: Date.now
    },
    creatorId: {
        type: String,
        required: true
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
        type: Date,
        default: '',
        required: true
    },
    transportationOption: {
        type: String,
        default: '',
        required: true
    },
    price: {
        type: Number,
        default: ''
    },
    guestNumbers: {
        type: Number,
        default: ''
    }
});
exports.default = mongoose_1.model('Trip', TripSchema);
//# sourceMappingURL=Trip.js.map