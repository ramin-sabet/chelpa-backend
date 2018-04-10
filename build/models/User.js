"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
// tslint:disable object-literal-sort-keys
var UserSchema = new mongoose_1.Schema({
    createdAt: {
        type: Date,
        default: Date.now
    },
    userId: {
        default: '',
        type: String,
    },
    userName: {
        type: String,
        default: '',
        required: true,
    },
    phoneNumber: {
        type: Number,
        default: '',
        required: true,
    },
    maleFemale: {
        type: String,
        default: ''
    },
    studyWork: {
        type: String,
        default: ''
    },
    study: {
        type: String,
        default: ''
    },
    studyField: {
        type: String,
        default: ''
    },
    work: {
        type: String,
        default: '',
    },
    workField: {
        type: String,
        default: ''
    },
    interests: {
        type: String,
        default: ''
    }
    // },
    // image: {
    //     filename: String,
    //     originalName: String,
    //     dest: String,
    //     created: { type: Date, default: Date.now }
    // }
});
exports.default = mongoose_1.model('User', UserSchema);
//# sourceMappingURL=User.js.map