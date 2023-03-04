import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AppError } from '../../../../src/shared/utils/app-error.exception';
import { DB_NAME } from '../../../../src/shared/utils/constants';
import { Repository } from 'typeorm';
import { CreateLevelDto } from '../dto/create-level.dto';
import { Level } from '../entities/level.entity';

@Injectable()
export default class CreateLevelService {
  constructor(
    @InjectRepository(Level, DB_NAME)
    private readonly levelRepository: Repository<Level>,
  ) {}

  async execute(createLevelDto: CreateLevelDto): Promise<Level> {
    const level = this.levelRepository.create(createLevelDto);
    try {
      const savedLevel = await this.levelRepository.save(level);
      return savedLevel;
    } catch (error) {
      throw new AppError({
        id: 'ERROR_CREATING_LEVEL',
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Error saving level',
        error,
      });
    }
  }
}
