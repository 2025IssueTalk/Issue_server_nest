import { Controller, Post, Body } from '@nestjs/common';
import { DebateService } from './debate.service';
import {
  CreateDebateRequestDto,
  CreateDebateResponseDto,
} from './dto/create-debate.dto';
import { User } from '@common/decorators/user.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

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
    return this.debateService.createDebateRoom(body.name, userId);
  }
}
