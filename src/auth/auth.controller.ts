import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { RefreshTokenDTOrequest, SignInDTORequest, SignUpDTORequest } from './DTOS/auth.dto.js';

@Controller('auth')
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  @Post('sign-up')
  signup(@Body() _body: SignUpDTORequest) {
    return this.auth.signUp(_body);
  }

  @Post('sign-in')
  signin(@Body() _body: SignInDTORequest) {
    return this.auth.signIn(_body);
  }

  @Post('refresh-token')
  refreshToken(@Body() _refreshToken: RefreshTokenDTOrequest) {
    this.auth.generateRefreshToken(_refreshToken.token);
  }
}
