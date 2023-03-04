import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DB_NAME } from '../../../../src/shared/utils/constants';
import { Repository } from 'typeorm';
import { UpdateLevelDto } from '../dto/update-level.dto';
import { Level } from '../entities/level.entity';
import FindLevelService from './find-level.service';

@Injectable()
export default class UpdateLevelService {
  constructor(
    @InjectRepository(Level, DB_NAME)
    private readonly levelRepository: Repository<Level>,
    private readonly findOne: FindLevelService,
  ) {}

  async execute(id: number, updateLevelDto: UpdateLevelDto) {
    const level = await this.findOne.execute(id);

    const updatedLevel = this.levelRepository.merge(level, updateLevelDto);

    return await this.levelRepository.save(updatedLevel);
  }
}
