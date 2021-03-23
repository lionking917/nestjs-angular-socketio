export class Event {
  _id: string;
  name: string;
  startTime: Date;
  endTime: Date;
  broadcast: boolean;
  updatedAt: Date;

  constructor() {
    this._id = '';
    this.name = '';
    this.startTime = new Date();
    this.endTime = new Date();
    this.updatedAt = new Date();
    this.broadcast = false;
  }
}
