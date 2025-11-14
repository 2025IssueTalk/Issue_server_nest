import { BadRequestException, Injectable } from '@nestjs/common';
import { v4 } from 'uuid';
import { Debate } from './models/debate.model';
import { CreateDebateRequestDto } from './dto/create-debate.dto';

@Injectable()
export class DebateService {
  private debates: Record<string, Debate> = {}; // Rooms InMemory Record

  createDebate(
    debate: CreateDebateRequestDto,
    createUserId: string,
  ): Debate {
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
      participants: [createUserId],
      maxParticipants,
      isPublic,
      topic,
      ...(!isPublic && { password: password }),
    };
    return this.debates[debateId];
  }

  getDebates(): Debate[] {
    return Object.values(this.debates);
  }
}
