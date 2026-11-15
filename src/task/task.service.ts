import { Injectable } from '@nestjs/common';
import {
  Cron,
  CronExpression,
  Interval,
  Timeout,
} from '@nestjs/schedule';

@Injectable()
export class TaskService {
  @Cron(CronExpression.EVERY_5_SECONDS, {
    name: 'database-backup',
    timeZone: 'Africa/Nairobi',
    initialDelay:
      50 *
      1000 /**Starts only if DB,REDIS Is up */,
  })
  backUpDB() {
    console.log('Starting Backup...');
  }

  //This highly depends on the startup time of the application and not the clock time
  @Interval(
    10000,
  ) /**Every 10 secs after startup of the application */
  sendEmails() {
    console.log('sending emails........');
  }

  @Timeout(5000)
  clearTokens() {
    console.log('clearing tokens');
  }
}
