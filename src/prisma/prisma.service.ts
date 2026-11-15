// docker exec -it 49862a5ca06c mysql -uroot -p123 -e "GRANT ALL PRIVILEGES ON *.* TO 'appuser'@'%'; FLUSH PRIVILEGES;"

import { Injectable } from '@nestjs/common';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import { PrismaClient } from '../generated/prisma/client.js';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    const adapter = new PrismaMariaDb({
      host: process.env.DB_HOST ?? 'localhost',
      port: Number(process.env.DB_PORT ?? 3306),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      connectionLimit: Number(process.env.DB_CONNECTION_LIMIT ?? 10),
    });

    super({ adapter });
  }
}
