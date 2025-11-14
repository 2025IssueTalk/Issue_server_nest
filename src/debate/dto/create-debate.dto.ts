import { IsString } from 'class-validator';

export class CreateDebateDto {
  @IsString()
  name: string;
}
