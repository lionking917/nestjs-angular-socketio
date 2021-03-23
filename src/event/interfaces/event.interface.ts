import { Document } from 'mongoose';

export interface Event extends Document {
  readonly name: string;
  readonly startTime: Date;
  readonly endTime: Date;
  readonly broadcast: boolean;
}
