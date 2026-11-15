import { Controller, Get } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

@Controller('auth')
export class AuthController {
  constructor(private Prisma: PrismaService) {}

  @Get()
  GetUsers() {
    return this.Prisma.user.findMany();
  }
}
