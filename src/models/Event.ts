import { model, Schema } from 'mongoose';

// tslint:disable object-literal-sort-keys
const EventSchema: Schema = new Schema({
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
    // unique: true,
    // lowercase: true
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
  properties: [Schema.Types.Mixed],

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
  }]
});

export default model('Event', EventSchema);