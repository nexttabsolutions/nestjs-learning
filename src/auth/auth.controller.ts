import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { CacheInterceptor, CacheKey, CacheTTL } from '@nestjs/cache-manager';

@UseInterceptors(CacheInterceptor)
@Controller('auth')
export class AuthController {
  constructor(private auth: AuthService) {}

  @Get()
  @CacheTTL(10 * 1000 * 4)
  @CacheKey('Get-Users')
  GetUsers() {
    console.log('inside controller..');
    return this.auth.getUsers();
  }
}
