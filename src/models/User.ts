import { model, Schema } from 'mongoose';

// tslint:disable object-literal-sort-keys
const UserSchema: Schema = new Schema({
    createdAt: {
        type: Date,
        default: Date.now
    },
    userId: {
        default: '',
        type: String,
        // unique: true
    },
    userName: {
        type: String,
        default: '',
        required: true,
        // unique: true
    },
    phoneNumber: {
        type: Number,
        default: '',
        required: true,
        // unique: true
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

export default model('User', UserSchema);