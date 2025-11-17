import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { DebateService } from './debate.service';
import { Socket } from 'socket.io';
import { WsUser } from '@common/decorators/ws-user.decorator';
import { extractWsUser } from '@common/utils/ws-user.util';

@WebSocketGateway({ cors: true })
export class DebateGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly debateService: DebateService) {}

  handleConnection(@ConnectedSocket() client: Socket) {
    console.log('Client connected: ', client.id);
  }
  handleDisconnect(client: Socket) {
    try {
      const userId = extractWsUser(client, client.data);
      if (typeof userId !== 'string')
        throw new Error('userId must be a string');
      const debates = this.debateService.getDebatesByUserId(userId);
      debates.forEach((debateId) => {
        const participants = this.debateService.leaveDebate(debateId, userId);
        client.to(debateId).emit('participants', participants);
      });
    } catch {
      console.log('Client disconnected: ', client.id);
    }
  }

  @SubscribeMessage('joinDebate')
  handleJoinDebate(
    @MessageBody() data: { roomId: string; password?: string },
    @WsUser('userId') userId: string,
    @ConnectedSocket() client: Socket,
  ) {
    const participants = this.debateService.joinDebate(
      data.roomId,
      userId,
      data.password,
    );
    client.join(data.roomId);
    client.to(data.roomId).emit('participants', participants);
    client.emit('joinedDebate', { roomId: data.roomId, participants });
  }

  @SubscribeMessage('leaveDebate')
  handleLeaveDebate(
    @MessageBody() data: { roomId: string },
    @WsUser('userId') userId: string,
    @ConnectedSocket() client: Socket,
  ) {
    const participants = this.debateService.leaveDebate(data.roomId, userId);
    client.leave(data.roomId);
    client.to(data.roomId).emit('participants', participants);
    client.emit('leaveDebate', { roomId: data.roomId });
  }
}
