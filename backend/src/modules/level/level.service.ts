import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AppError } from 'src/shared/database/utils/app-error.exception';
import { Repository } from 'typeorm';
import { CreateLevelDto } from './dto/create-level.dto';
import { UpdateLevelDto } from './dto/update-level.dto';
import { Level } from './entities/level.entity';

@Injectable()
export class LevelService {
  constructor(
    @InjectRepository(Level, 'DB')
    private readonly levelRepository: Repository<Level>,
  ) {}

  async create(createLevelDto: CreateLevelDto) {
    const level = this.levelRepository.create(createLevelDto);

    try {
      return await this.levelRepository.save(level);
    } catch (error) {
      throw new AppError({
        id: 'ERROR_CREATING_LEVEL',
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Error creating level',
        error,
      });
    }
  }

  async findAll() {
    return await this.levelRepository.find();
  }

  async findOne(id: number) {
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

  async update(id: number, updateLevelDto: UpdateLevelDto) {
    const level = await this.findOne(id);

    const updatedLevel = this.levelRepository.merge(level, updateLevelDto);

    return await this.levelRepository.save(updatedLevel);
  }

  async remove(id: number) {
    const level = await this.findOne(id);

    if (level.developers.length) {
      throw new AppError({
        id: 'LEVEL_HAS_DEVELOPERS',
        status: HttpStatus.BAD_REQUEST,
        message: 'Level has developers',
      });
    }

    await this.levelRepository
      .createQueryBuilder()
      .delete()
      .where('id = :id', { id })
      .execute();
    return;
  }
}
