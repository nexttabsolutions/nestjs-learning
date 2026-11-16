import { BadRequestException, HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { SignInDTORequest, SignUpDTORequest } from './DTOS/auth.dto.js';
import { PrismaService } from '../db/prisma.service.js';
import argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { v4 as uuidv4 } from 'uuid';
@Injectable()
export class AuthService {
  constructor(
    private readonly db: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(body: SignUpDTORequest) {
    try {
      const existingEmail = await this.db.user.findUnique({
        where: {
          email: body.email,
        },
      });

      if (existingEmail) throw new HttpException('', HttpStatus.CREATED);

      const password = await this.hashPassword(body.password);
      const user = await this.db.user.create({
        data: {
          email: body.email,
          password,
          firstname: body.firstname,
          lastname: body.lastname,
        },
      });

      const tokens = this.generateUserToken(user.id);
      return {
        ...tokens,
        userId: user.id,
      };
    } catch (error) {
      throw new HttpException({ error }, HttpStatus.BAD_GATEWAY);
    }
  }

  async signIn(_body: SignInDTORequest) {
    try {
      const existingUser = await this.db.user.findUnique({
        where: { email: _body.email },
      });

      if (!existingUser) throw new BadRequestException('inavalid credentials');

      const verifypassword = await this.verifyPassword(_body.password, existingUser.password);
      if (!verifypassword) throw new BadRequestException('invalid credentials');

      const tokens = await this.generateUserToken(existingUser.id);
      return {
        ...tokens,
        userId: existingUser.id,
      };
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error);
    }
  }

  async signOut() {}

  async generateUserToken(userId: string) {
    const accessToken = this.jwtService.sign(
      { userId },
      {
        expiresIn: '1h',
      },
    );

    const refreshToken = uuidv4();
    await this.storeRefreshToken(refreshToken, userId);

    return {
      accessToken,
      refreshToken,
    };
  }

  async storeRefreshToken(token: string, userId: string) {
    try {
      const expiryDate = new Date();
      expiryDate.setDate(expiryDate.getDate() + 3);

      await this.db.refreshToken.upsert({
        where: { userId },
        update: { token, expiresDate: expiryDate },
        create: { token, userId, expiresDate: expiryDate },
      });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async generateRefreshToken(_token: string) {
    return this.db.$transaction(async (tx) => {
      const token = await tx.refreshToken.findFirst({
        where: {
          token: _token,
          expiresDate: { gte: new Date() },
        },
      });

      if (!token) {
        throw new UnauthorizedException({
          success: false,
          message: 'invalid refresh token',
          code: 'INVALID_REFRESH_TOKEN',
        });
      }

      return this.generateUserToken(token?.userId);
    });
  }

  async hashPassword(plainPassword: string): Promise<string> {
    const hashedpassword = await argon.hash(plainPassword);
    return hashedpassword;
  }

  async verifyPassword(plainPassword: string, hashedpassword: string): Promise<boolean> {
    return await argon.verify(hashedpassword, plainPassword);
  }
}
