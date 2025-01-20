import { IsString, MinLength } from 'class-validator';

export class CreateCarRequest {
  @IsString()
  @MinLength(1)
  model: string;
}
