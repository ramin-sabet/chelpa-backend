import { model, Schema } from 'mongoose';
import User from '../models/User';

// tslint:disable object-literal-sort-keys
const ChatSchema: Schema = new Schema({
    createdAt: {
        type: Date,
        default: Date.now
    },
    conversationId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

export default model('Chat', ChatSchema);