import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import type { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

@Injectable()
export class AuthService {
  constructor(
    private db: PrismaService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async getUsers() {
    console.log('INSIDE SERVICE');
    const usersData = await this.retrieveStudentsFromDb();
    return usersData;
  }

  async retrieveStudentsFromDb() {
    return new Promise((resolve) =>
      setTimeout(() => {
        const users = [{ name: 'john' }, { name: 'omar' }, { name: 'salim' }];

        resolve(users);
      }, 1000),
    );
  }
}
