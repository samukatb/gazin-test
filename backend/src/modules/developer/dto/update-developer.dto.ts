import { IsEnum, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { SexType } from '../enums/sex.enum';

export class UpdateDeveloperDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsEnum(SexType)
  sex: SexType;

  @ApiProperty()
  @IsString()
  birthdate: string;

  @ApiProperty()
  @IsString()
  hobby: string;

  @ApiProperty()
  @IsNumber()
  level_id: number;
}
