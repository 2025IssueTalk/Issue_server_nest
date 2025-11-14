import { IsString, IsBoolean, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDebateRequestDto {
  @IsString()
  @ApiProperty({ description: '방 제목' })
  name: string;

  @IsNumber()
  @ApiProperty({ description: '참여 인원 수', example: 2 })
  maxParticipants: number;

  @IsBoolean()
  @ApiProperty({ description: '공개 여부', example: true })
  isPublic: boolean;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: '비공개 방 비밀번호', required: false })
  password?: string;

  @IsString()
  @ApiProperty({ description: '토론 주제' })
  topic: string;
}

export class CreateDebateResponseDto {
  @ApiProperty({ description: '방 ID' })
  id: string;

  @ApiProperty({ description: '방 제목' })
  name: string;

  @ApiProperty({ description: '참여 유저 ID 배열' })
  participants: string[];

  @ApiProperty({ description: '참여 인원 수' })
  maxParticipants: number;

  @ApiProperty({ description: '공개 여부' })
  isPublic: boolean;

  @ApiProperty({ description: '비공개 방 비밀번호', required: false })
  password?: string;

  @ApiProperty({ description: '토론 주제' })
  topic: string;
}
