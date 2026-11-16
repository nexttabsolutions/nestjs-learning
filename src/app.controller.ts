import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from './guards/auth.guard.js';

@UseGuards(AuthGuard)
@Controller()
export class AppController {
  constructor() {}

  @Get()
  someProtectedRoute(@Req() req: any) {
    return { message: 'Accessed Resource', userId: req.userId };
  }
}
