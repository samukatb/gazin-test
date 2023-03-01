import { Transform } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export class DeveloperQueryDto {
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  page?: number;

  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  limit?: number;
}
