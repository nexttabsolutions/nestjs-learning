import { ThrottlerStorageRedisService } from '@nest-lab/throttler-storage-redis';
import { ExecutionContext, Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { seconds, ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { AuthModule } from './auth/auth.module.js';
import { PrismaModule } from './prisma/prisma.module.js';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    ThrottlerModule.forRoot({
      throttlers: [
        {
          limit: 4,
          ttl: seconds(10),
          //unblocked after 1s , you can increase the waiting time
          blockDuration: seconds(1),
        },
      ],
      errorMessage: 'Wow!!! Slow down',
      storage: new ThrottlerStorageRedisService(),
      getTracker: (req: Record<string, any>, context: ExecutionContext) => {
        console.log(context);
        return req.headers['x-tenant-id'];
      },

      //THIS WILL BLOCK A SPAMMER FROM ALL ENPOINTS NOT ONE
      generateKey: (
        context: ExecutionContext,
        trackerString: string,
        throttlerName: string,
      ) => {
        console.log(trackerString, throttlerName, context);

        //ALWAYS HASH IT
        return trackerString;
      },
    }),
  ],

  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
