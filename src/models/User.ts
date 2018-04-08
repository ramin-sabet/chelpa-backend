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
        type: String,
        default: '',
        required: true,
        // unique: true
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