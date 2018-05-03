import { model, Schema } from 'mongoose';

// tslint:disable object-literal-sort-keys
const ChatSchema: Schema = new Schema({
    createdAt: {
        type: Date,
        default: Date.now
    },
    participant1: {
        type: String,
        required: true
    },
    participant2:{
        type: String,
        required: true
    },
    body: [{
        type: String,
        required: true
    }]
});

export default model('Chat', ChatSchema);