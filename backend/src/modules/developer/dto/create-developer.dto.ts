import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEnum, IsNumber } from 'class-validator';
import { SexType } from '../enums/sex.enum';

export class CreateDeveloperDto {
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
