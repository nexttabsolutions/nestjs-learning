import { Controller, Get, Post } from '@nestjs/common';
import { CronExpression, SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';

@Controller('task')
export class TaskController {
  constructor(private schedulerRegistry: SchedulerRegistry) {}

  @Get('start-db')
  backupdb() {
    const job = new CronJob(CronExpression.EVERY_SECOND, () => {
      console.log('Running Backup Job....');
    });
    this.schedulerRegistry.addCronJob('new-db-backup', job);
    job.start();
    return {
      message: 'Backup job created and started',
    };
  }

  @Post('pause-db')
  pauseDb() {
    const job = this.schedulerRegistry.getCronJob('new-db-backup');
    job.stop();
    return { message: 'Job paused' };
  }
}
