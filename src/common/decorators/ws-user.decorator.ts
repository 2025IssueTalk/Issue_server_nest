import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Socket } from 'socket.io';
import { extractWsUser } from '@common/utils/ws-user.util';

export const WsUser = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    const client = ctx.switchToWs().getClient<Socket>();
    extractWsUser(client, data as string);
  },
);
