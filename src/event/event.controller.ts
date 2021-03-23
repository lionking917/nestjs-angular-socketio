import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { EventDto } from './dto/event.dto';
import { EventService } from './event.service';
import { Event } from './interfaces/event.interface';

@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post()
  async create(@Body() eventDto: EventDto) {
    return this.eventService.create(eventDto);
  }

  @Get()
  async findAll(): Promise<Event[]> {
    return this.eventService.findAll();
  }

  @Get(':id')
  async find(@Param('id') id: string) {
    return this.eventService.find(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() eventDto: EventDto) {
    return this.eventService.update(id, eventDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string, @Body() eventDto: EventDto) {
    return this.eventService.delete(id, eventDto);
  }
}
