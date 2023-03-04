import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AppError } from '../../../../src/shared/utils/app-error.exception';
import { DB_NAME } from '../../../../src/shared/utils/constants';
import { Repository } from 'typeorm';
import { Level } from '../entities/level.entity';
import FindLevelService from './find-level.service';

@Injectable()
export default class DeleteLevelService {
  constructor(
    @InjectRepository(Level, DB_NAME)
    private readonly levelRepository: Repository<Level>,
    private readonly findOne: FindLevelService,
  ) {}

  async execute(id: number) {
    const level = await this.findOne.execute(id);

    if (level.developers.length) {
      throw new AppError({
        id: 'LEVEL_HAS_DEVELOPERS',
        status: HttpStatus.BAD_REQUEST,
        message: 'Level has developers',
      });
    }

    await this.levelRepository.delete(id);
    return;
  }
}
