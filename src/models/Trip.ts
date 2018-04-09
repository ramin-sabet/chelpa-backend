import { model, Schema } from 'mongoose';

// tslint:disable object-literal-sort-keys
const TripSchema: Schema = new Schema({
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
        type: String,
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

export default model('Trip', TripSchema);