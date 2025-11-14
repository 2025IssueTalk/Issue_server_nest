import { IsString } from 'class-validator';

export class CreateDebateRequestDto {
  @IsString()
  name: string;
}

export class CreateDebateResponseDto {
  name: string;
  participants: string[];
}
