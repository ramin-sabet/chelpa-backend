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
    username: {
        type: String,
        default: '',
        required: true,
        // unique: true
    }
});

export default model('User', UserSchema);