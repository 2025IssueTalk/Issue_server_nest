import { Module } from '@nestjs/common';
import { DebateGateway } from './debate.gateway';
import { DebateController } from './debate.controller';
import { DebateService } from './debate.service';

@Module({
  providers: [DebateGateway, DebateService],
  controllers: [DebateController]
})
export class DebateModule {}
