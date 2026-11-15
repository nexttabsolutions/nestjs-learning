import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module.js';
import { AuthModule } from './auth/auth.module.js';
import { TaskModule } from './task/task.module.js';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ScheduleModule.forRoot({
      cronJobs: false /**You can turn on or of the cron job */,
      intervals: false,
      timeouts: false,
    }),
    PrismaModule,
    AuthModule,
    TaskModule,
  ],
})
export class AppModule {}
