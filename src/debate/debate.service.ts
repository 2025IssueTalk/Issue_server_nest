import { Injectable } from '@nestjs/common';
import { v4 } from 'uuid';

interface DebateRoom {
  name: string; // RoomName
  participants: string[]; // UserId Array
}
@Injectable()
export class DebateService {
  private debateRooms: Record<string, DebateRoom> = {}; // Rooms InMemory Record

  createDebateRoom(name: string, createUserId: string): DebateRoom {
    let roomId: string;
    do {
      roomId = v4();
    } while (this.debateRooms[roomId]);

    this.debateRooms[roomId] = { name: name, participants: [createUserId] };
    return this.debateRooms[roomId];
  }

  getDebateRooms(): DebateRoom[] {
    return Object.values(this.debateRooms);
  }
}
