import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AppError } from 'src/shared/database/utils/app-error.exception';
import { Repository } from 'typeorm';
import { LevelService } from '../level/level.service';
import { CreateDeveloperDto } from './dto/create-developer.dto';
import { DeveloperQueryDto } from './dto/developer-query.dto';
import { UpdateDeveloperDto } from './dto/update-developer.dto';
import { Developer } from './entities/developer.entity';

@Injectable()
export class DeveloperService {
  constructor(
    @InjectRepository(Developer, 'DB')
    private readonly developerRepository: Repository<Developer>,
    private readonly levelService: LevelService,
  ) {}

  async create(createDeveloperDto: CreateDeveloperDto) {
    try {
      await this.levelService.findOne(createDeveloperDto.level_id);
    } catch (error) {
      throw new AppError({
        id: 'LEVEL_NOT_FOUND',
        status: HttpStatus.BAD_REQUEST,
        message: 'Level not found',
        error,
      });
    }

    const developer = this.developerRepository.create(createDeveloperDto);

    return await this.developerRepository.save(developer);
  }

  async findAll(query: DeveloperQueryDto): Promise<{
    developers: Developer[];
    total: number;
    currentPage: number;
    perPage: number;
  }> {
    const { page = 1, limit = 10 } = query;
    const [developers, total] = await this.developerRepository.findAndCount({
      take: limit,
      skip: (page - 1) * limit,
    });

    return {
      developers,
      total,
      currentPage: page,
      perPage: limit,
    };
  }

  async findOne(id: number) {
    const level = await this.developerRepository.findOneBy({ id });

    if (!level) {
      throw new AppError({
        id: 'DEVELOPER_NOT_FOUND',
        status: HttpStatus.NOT_FOUND,
        message: 'Developer not found',
      });
    }

    return level;
  }

  async update(id: number, updateDeveloperDto: UpdateDeveloperDto) {
    try {
      await this.levelService.findOne(updateDeveloperDto.level_id);
    } catch (error) {
      throw new AppError({
        id: 'LEVEL_NOT_FOUND',
        status: HttpStatus.BAD_REQUEST,
        message: 'Level not found',
        error,
      });
    }

    const developer = await this.findOne(id);

    const updateddeveloper = this.developerRepository.merge(
      developer,
      updateDeveloperDto,
    );

    return await this.developerRepository.save(updateddeveloper);
  }

  async remove(id: number) {
    try {
      await this.findOne(id);
    } catch (error) {
      throw new AppError({
        id: 'DEVELOPER_NOT_FOUND',
        status: HttpStatus.BAD_REQUEST,
        message: 'Developer not found',
        error,
      });
    }

    await this.developerRepository.delete(id);
    return;
  }
}
