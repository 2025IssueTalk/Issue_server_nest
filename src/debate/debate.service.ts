import { BadRequestException, Injectable } from '@nestjs/common';
import { v4 } from 'uuid';
import { Debate } from './models/debate.model';
import { CreateDebateRequestDto } from './dto/create-debate.dto';

@Injectable()
export class DebateService {
  private debates: Record<string, Debate> = {}; // Rooms InMemory Record
  private userRelation: Map<string, Set<string>> = new Map(); // UserId -> Set<roomId>

  createDebate(debate: CreateDebateRequestDto, createUserId: string): Debate {
    let debateId: string;
    do {
      debateId = v4();
    } while (this.debates[debateId]);
    const { name, maxParticipants, isPublic, password, topic } = debate;

    if (!isPublic && !password)
      throw new BadRequestException('private requires a password');

    this.debates[debateId] = {
      id: debateId,
      name,
      participants: [],
      maxParticipants,
      isPublic,
      topic,
      ...(!isPublic && { password: password }),
      adminId: createUserId,
    };

    return this.debates[debateId];
  }

  getDebates(): Debate[] {
    return Object.values(this.debates);
  }

  joinDebate(debateId: string, userId: string): string[] {
    const debate = this.debates[debateId];
    if (!debate) throw new BadRequestException('Debate not found');

    if (!debate.participants.includes(userId)) debate.participants.push(userId);

    if (!this.userRelation.has(userId))
      this.userRelation.set(userId, new Set());
    this.userRelation.get(userId)!.add(debateId);

    return debate.participants;
  }

  leaveDebate(debateId: string, userId: string): string[] {
    const debate = this.debates[debateId];

    if (!debate) throw new BadRequestException('Debate not found');

    debate.participants = debate.participants.filter((id) => id !== userId);
    this.userRelation.get(userId)?.delete(userId);

    return debate.participants;
  }

  getDebatesByUserId(userId: string): string[] {
    return Array.from(this.userRelation.get(userId) || []);
  }
}
