import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigType } from '@nestjs/config';
import { Request } from 'express';
import { REQUEST_USER_KEY } from '../../constants/iam.constants';
import jwtConfig from '../../config/jwt.config';


@Injectable()
export class AccessTokenGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY) private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) { }

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromRequest(request);
    if (!token) {
      throw new UnauthorizedException().getResponse();
    }
    try {
      const payload = await this.jwtService.verifyAsync(
        token,
        this.jwtConfiguration
      );

      request[REQUEST_USER_KEY] = payload;
    } catch (error) {
      throw new UnauthorizedException().getResponse();
    }
    return true;
  }

  private extractTokenFromRequest(request: Request): string | undefined {
    const [_, token] = request.headers.authorization?.split(' ') ?? [];
    return token;
  }
}
