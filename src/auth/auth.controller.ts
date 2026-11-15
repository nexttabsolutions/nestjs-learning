import { Body, Controller, Get, Post } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthSignUpDTO, AuthSignUpResponseDTO } from './DTOs/auth.dto.js';

/*
  ApiTags(<strings>)
  Uses a custom name in the SWAGGER DOCS instead of the controller name
*/
@ApiTags('Authentication ')
@ApiBearerAuth() /**Bearer Token to access the routes */
@Controller('auth')
export class AuthController {
  constructor(private Prisma: PrismaService) {}

  @Get()
  GetUsers() {
    return this.Prisma.user.findMany();
  }

  //==SWAGGER RESPOSNSES AND REQUESTS====
  @ApiOperation({
    summary: 'Used To create a new user',
  })
  @ApiResponse({
    status: 201,
    description: 'product was created',
    type: AuthSignUpResponseDTO,
  })
  // ==================############==============
  @Post()
  CreateUser(@Body() _body: AuthSignUpDTO) {
    return 'ok';
  }
}
