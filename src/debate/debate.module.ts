import { Module } from '@nestjs/common';
import { DebateGateway } from './debate.gateway';

@Module({
  providers: [DebateGateway]
})
export class DebateModule {}
