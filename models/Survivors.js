import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const survivorSchema = new Schema({
  name: String,
  age: Number,
  gender: String,
  location: String,
  inventory: [],
  infected: { type: Boolean, default: false },
  infectedCount: { type: Number, default: 0 } });

export default survivorSchema;
