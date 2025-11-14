import { ApiProperty } from '@nestjs/swagger';

export class GetDebateResponseDto {
  @ApiProperty({ description: '방 ID' })
  id: string;

  @ApiProperty({ description: '방 제목' })
  name: string;

  @ApiProperty({ description: '참여 인원 수' })
  maxParticipants: number;

  @ApiProperty({ description: '공개 여부' })
  isPublic: boolean;

  @ApiProperty({ description: '토론 주제' })
  topic: string;
}
