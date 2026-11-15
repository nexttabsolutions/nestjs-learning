import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { createKeyv } from '@keyv/redis';
import { PrismaModule } from './prisma/prisma.module.js';
import { AuthModule } from './auth/auth.module.js';

@Module({
  imports: [
    CacheModule.registerAsync({
      isGlobal: true,
      useFactory: async () => ({
        ttl: 6 * 1000, // milliseconds
        stores: [createKeyv('redis://localhost:6379')],
      }),
    }),
    PrismaModule,
    AuthModule,
  ],
})
export class AppModule {}
