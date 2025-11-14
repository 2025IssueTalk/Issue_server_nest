import { Controller, Post, Body, Get } from '@nestjs/common';
import { DebateService } from './debate.service';
import {
  CreateDebateRequestDto,
  CreateDebateResponseDto,
} from './dto/create-debate.dto';
import { User } from '@common/decorators/user.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GetDebateResponseDto } from './dto/get-debate.dto';

@ApiTags('debate')
@ApiBearerAuth()
@Controller('debate')
export class DebateController {
  constructor(private readonly debateService: DebateService) {}

  @Post()
  createDebate(
    @Body() body: CreateDebateRequestDto,
    @User('userId') userId: string,
  ): CreateDebateResponseDto {
    return this.debateService.createDebate(body, userId);
  }

  @Get()
  getDebate(): GetDebateResponseDto[] {
    const debates = this.debateService.getDebates();
    return debates.map(
      ({ password: _password, participants: _participants, ...room }) => room,
    );
  }
}
