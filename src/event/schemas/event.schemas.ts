import * as mongoose from 'mongoose';

export const EventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  startTime: { type: Date, default: Date.now },
  endTime: { type: Date, default: Date.now },
  broadcast: { type: Boolean, default: false },
  updatedAt: { type: Date, default: Date.now },
});
