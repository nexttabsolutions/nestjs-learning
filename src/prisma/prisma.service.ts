import { Injectable } from '@nestjs/common';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import { PrismaClient } from '@prisma/client/extension';
import { ENV_TYPES } from '../constants/constants.js';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    const adapter = new PrismaMariaDb({
      connectionLimit: ENV_TYPES.DB_CONNECTION,
      port: ENV_TYPES.DB_PORT,
      database: ENV_TYPES.DB_DATABASE,
      user: ENV_TYPES.DB_USER,
      password: ENV_TYPES.DB_PASSWORD,
      host: ENV_TYPES.DB_HOST,
    });

    super({
      adapter,
    });
  }
}
