"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
// tslint:disable object-literal-sort-keys
var EventSchema = new mongoose_1.Schema({
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    creatorId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        default: '',
        required: true
    },
    time: {
        type: String,
        default: '',
        required: true
    },
    price: {
        type: Number,
        default: '',
        required: true,
    },
    location: {
        type: String,
        default: '',
        required: true
    },
    capacity: {
        type: Number,
        default: '',
        required: true
    },
    properties: [mongoose_1.Schema.Types.Mixed],
    rides: [{
            createdAt: {
                type: Date,
                default: Date.now
            },
            updatedAt: {
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
            items: [mongoose_1.Schema.Types.Mixed],
            peopleJoined: [{
                    createdAt: {
                        type: Date,
                        default: Date.now
                    },
                    userId: {
                        type: String,
                        default: Date.now,
                        required: true
                    },
                    rideId: {
                        type: String,
                        default: Date.now,
                        required: true
                    }
                }]
        }]
});
exports.default = mongoose_1.model('Event', EventSchema);
//# sourceMappingURL=Event.js.map