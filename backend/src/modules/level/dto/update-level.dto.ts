import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateLevelDto {
  @ApiProperty()
  @IsString()
  name: string;
}
