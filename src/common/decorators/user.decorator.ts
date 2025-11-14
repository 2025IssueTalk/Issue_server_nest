import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

interface JwtPayloadSafe {
  userId: string;
  email?: string;
  iss?: string;
  sub?: string;
  aud?: string | string[];
  exp?: number;
  iat?: number;
}

export const User = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<Request>();
    const authHeader = request.headers['authorization'] as string;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) throw new UnauthorizedException('JWT token is missing');

    try {
      const payload = jwt.verify(
        token,
        process.env.JWT_SECRET || '',
      ) as JwtPayloadSafe;

      if (!payload) throw new UnauthorizedException('Invalid JWT token');

      return data ? payload[data as keyof JwtPayloadSafe] : payload;
    } catch {
      throw new UnauthorizedException('Invalid JWT token');
    }
  },
);
