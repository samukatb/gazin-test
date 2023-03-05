import { Injectable } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationResponse } from '../../../@types/pagination-response.type';
import { PaginationQueryDto } from '../../../shared/dto/pagination.dto';
import { AppError } from '../../../shared/utils/app-error.exception';
import { DB_NAME } from '../../../shared/utils/constants';
import { FindManyOptions, Like, Repository } from 'typeorm';
import { Level } from '../entities/level.entity';

@Injectable()
export default class FindManyLevelsService {
  constructor(
    @InjectRepository(Level, DB_NAME)
    private readonly levelRepository: Repository<Level>,
  ) {}

  async execute(
    query?: PaginationQueryDto,
  ): Promise<PaginationResponse<Level>> {
    const { page = 1, limit = 10, search, orderBy } = query;
    const where = search ? { name: Like(`%${search}%`) } : {};

    const findOptions: FindManyOptions<Level> = {
      where,
      order: {
        name: orderBy,
      },
    };

    if (limit != -1) {
      findOptions.skip = (page - 1) * limit;
      findOptions.take = limit;
    }

    const [levels, total] = await this.levelRepository.findAndCount(
      findOptions,
    );

    if (!levels.length) {
      throw new AppError({
        id: 'LEVELS_NOT_FOUND',
        status: HttpStatus.NOT_FOUND,
        message: 'Levels not found',
      });
    }

    return {
      data: levels,
      total,
      currentPage: page,
      perPage: limit > 0 ? limit : total,
    };
  }
}
