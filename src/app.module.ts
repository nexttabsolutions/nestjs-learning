import { Module } from '@nestjs/common';
import { PrismaModule } from './db/prisma.module.js';
import { AuthModule } from './auth/auth.module.js';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import config from './config/config.js';
import { AppController } from './app.controller.js';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [config],
    }),
    PrismaModule,
    AuthModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configa: ConfigService) => ({
        secret: configa.getOrThrow('jwt.secret'),
      }),
      global: true,
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
})
export class AppModule {}
