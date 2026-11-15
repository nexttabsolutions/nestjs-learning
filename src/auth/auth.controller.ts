import { Controller, Get } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { minutes, seconds, SkipThrottle, Throttle } from '@nestjs/throttler';

@Controller('auth')
export class AuthController {
  constructor(private Prisma: PrismaService) {}

  @Get()
  @Throttle({
    //overrides the default settings
    default: {
      ttl: seconds(10),
      limit: 3,
      blockDuration: minutes(5),
    },
  })
  ratelimit() {
    return { message: 'hello world' };
  }

  @Get('/skip')
  @SkipThrottle()
  skippingthrottle() {
    return { message: 'skip' };
  }

  @Get('/users')
  GetUsers() {
    return this.Prisma.user.findMany();
  }
}
