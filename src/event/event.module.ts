import { Module } from '@nestjs/common';
import { EventController } from './event.controller';
import { EventService } from './event.service';
import { eventProviders } from './event.providers';
import { DatabaseModule } from '../database/database.module';
import { EventsGateway } from './events.gateway';

@Module({
  imports: [DatabaseModule],
  controllers: [EventController],
  providers: [EventService, EventsGateway, ...eventProviders],
})
export class EventModule {}
