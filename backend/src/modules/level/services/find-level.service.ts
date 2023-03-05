import { Injectable } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { InjectRepository } from '@nestjs/typeorm';
import { AppError } from '../../../shared/utils/app-error.exception';
import { DB_NAME } from '../../../shared/utils/constants';
import { Repository } from 'typeorm';
import { Level } from '../entities/level.entity';

@Injectable()
export default class FindLevelService {
  constructor(
    @InjectRepository(Level, DB_NAME)
    private readonly levelRepository: Repository<Level>,
  ) {}

  async execute(id: number) {
    const level = await this.levelRepository.findOne({
      where: { id },
      relations: ['developers'],
    });

    if (!level) {
      throw new AppError({
        id: 'LEVEL_NOT_FOUND',
        status: HttpStatus.NOT_FOUND,
        message: 'Level not found',
      });
    }

    return level;
  }
}
