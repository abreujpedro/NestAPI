import { IsOptional, IsString, MinLength } from 'class-validator';

export class GetCarRequest {
  @IsString()
  @IsOptional()
  @MinLength(1)
  model?: string;
}
