import { IsString, IsEnum, IsNumber } from 'class-validator';
import { SexType } from '../enums/sex.enum';

export class CreateDeveloperDto {
  @IsString()
  name: string;

  @IsEnum(SexType)
  sex: SexType;

  @IsString()
  birthdate: string;

  @IsString()
  hobby: string;

  @IsNumber()
  level_id: number;
}
