import { model, Schema } from 'mongoose';
import User from '../models/User';

// tslint:disable object-literal-sort-keys
const ConversationSchema: Schema = new Schema({
    participants: [{ type: Schema.Types.ObjectId, ref: 'User' }],
});

export default model('Conversation', ConversationSchema);