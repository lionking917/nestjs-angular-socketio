import { Inject, Injectable, Logger } from '@nestjs/common';
import { Model } from 'mongoose';
import { Cron } from '@nestjs/schedule';
import { EventDto } from './dto/event.dto';
import { Event } from './interfaces/event.interface';
import { EventsGateway } from './events.gateway';

@Injectable()
export class EventService {
  private readonly logger = new Logger(EventService.name);
  constructor(
    @Inject('EVENT_MODEL') private readonly eventModel: Model<Event>,
    private readonly eventsGateway: EventsGateway,
  ) {}

  async create(eventDto: EventDto): Promise<Event> {
    const createdEvent = new this.eventModel(eventDto);
    return await createdEvent.save();
  }

  async findAll(): Promise<Event[]> {
    return await this.eventModel.find().exec();
  }

  async find(id: string): Promise<Event> {
    return await this.eventModel.findById(id).exec();
  }

  async update(id: string, eventDto: EventDto): Promise<Event> {
    return await this.eventModel.findByIdAndUpdate(id, eventDto);
  }

  async delete(id: string, eventDto: EventDto): Promise<Event> {
    return await this.eventModel.findByIdAndRemove(id);
  }

  @Cron('30 * * * * *')
  async handleCron() {
    this.logger.debug('Called when the current second is 30');
    const events = await this.findAll();
    events.forEach((event) => {
      if (
        new Date(event.startTime).getTime() > new Date().getTime() &&
        !event.broadcast
      ) {
        this.eventsGateway.server.emit('newMessage', event);
        this.update(event._id, {
          name: event.name,
          startTime: event.startTime,
          endTime: event.endTime,
          broadcast: true
        });
      }
    });
  }
}
