import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDebateRequestDto {
  @IsString()
  @ApiProperty({ description: 'Debate name' })
  name: string;
}

export class CreateDebateResponseDto {
  name: string;
  participants: string[];
}
