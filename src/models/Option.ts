import { model, Schema } from 'mongoose';

// tslint:disable object-literal-sort-keys
const OptionSchema: Schema = new Schema({
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  name: {
    type: String,
    default: '',
    required: true
  }
  

 });

export default model('Option', OptionSchema);