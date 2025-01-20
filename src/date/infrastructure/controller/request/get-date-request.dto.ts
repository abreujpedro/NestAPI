import { IsString, Length } from 'class-validator';

export class GetDateRequest {
  @IsString()
  @Length(1, 2)
  test: string;
}
