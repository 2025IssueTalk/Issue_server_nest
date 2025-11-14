import { UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { Socket } from 'socket.io';
interface JwtPayloadSafe {
  userId: string;
  email?: string;
  iss?: string;
  sub?: string;
  aud?: string | string[];
  exp?: number;
  iat?: number;
}

export const extractWsUser = (client: Socket, data: string) => {
  const token = client.handshake?.auth?.token as string;

  if (!token) throw new UnauthorizedException('JWT token is missing');

  try {
    const payload = jwt.verify(
      token,
      process.env.JWT_SECRET || 'test',
    ) as JwtPayloadSafe;

    if (!payload) throw new UnauthorizedException('Invalid JWT token');

    return data ? payload[data as keyof JwtPayloadSafe] : payload;
  } catch {
    throw new UnauthorizedException('Invalid JWT token');
  }
};
