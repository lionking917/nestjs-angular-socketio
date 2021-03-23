import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventModule } from './event/event.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ScheduleModule } from '@nestjs/schedule';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    EventModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'client/dist/client'),
    }),
    ScheduleModule.forRoot(),
    // JwtModule.register({
    //   secretOrPrivateKey: 'secret123',
    // }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
