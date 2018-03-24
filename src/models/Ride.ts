import { model, Schema } from 'mongoose';

// tslint:disable object-literal-sort-keys
const RideSchema: Schema = new Schema({
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    creatorId: {
        type: Number
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
        // unique: true,
        // lowercase: true
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
    items: [Schema.Types.Mixed]
}

);

export default model('Ride', RideSchema);