import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationResponse } from 'src/@types/pagination-response.type';
import { PaginationQueryDto } from 'src/shared/dto/pagination.dto';
import { AppError } from 'src/shared/utils/app-error.exception';
import { FindManyOptions, Like, Repository } from 'typeorm';
import { LevelService } from '../level/level.service';
import { CreateDeveloperDto } from './dto/create-developer.dto';
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

  async findAll(
    query: PaginationQueryDto,
  ): Promise<PaginationResponse<Developer>> {
    const { page = 1, limit = 10, search, orderBy } = query;
    const where = search ? { name: Like(`%${search}%`) } : {};

    const findOptions: FindManyOptions<Developer> = {
      where,
      order: {
        name: orderBy,
      },
    };

    if (limit != -1) {
      findOptions.skip = (page - 1) * limit;
      findOptions.take = limit;
    }

    const [developers, total] = await this.developerRepository.findAndCount({
      where,
      relations: ['level'],
      order: {
        name: orderBy,
      },
      ...findOptions,
    });

    if (!developers.length) {
      throw new AppError({
        id: 'DEVELOPERS_NOT_FOUND',
        status: HttpStatus.NOT_FOUND,
        message: 'Developers not found',
      });
    }

    return {
      data: developers,
      total,
      currentPage: page,
      perPage: limit > 0 ? limit : total,
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
