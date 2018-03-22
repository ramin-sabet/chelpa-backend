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
  creatorId:{
    type :Number
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
  properties:[Schema.Types.Mixed]}
  
  
//   [{
//       type: String,
//       default: ''
//     // type: Schema.Types.ObjectId,
//     // ref: 'Post'
//   }]
);

export default model('Event', EventSchema);