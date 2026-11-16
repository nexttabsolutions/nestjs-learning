import { CanActivate, ExecutionContext, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(_context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request: any = _context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeaders(request);

    if (!token) throw new UnauthorizedException('invalid token');

    try {
      const payload = this.jwtService.verify(token);
      request.userId = payload.userId;
    } catch (error) {
      Logger.error(error);
      throw new UnauthorizedException('invalid token');
    }

    //returning false blocks the request , true allows request
    return true;
  }

  private extractTokenFromHeaders(request: Request): string | undefined {
    return request.headers.authorization?.split(' ')[1];
  }
}
