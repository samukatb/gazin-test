import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationResponse } from 'src/@types/pagination-response.type';
import { PaginationQueryDto } from 'src/shared/dto/pagination.dto';
import { AppError } from 'src/shared/utils/app-error.exception';
import { DB_NAME } from 'src/shared/utils/constants';
import { Repository } from 'typeorm';
import { FindManyOptions } from 'typeorm/find-options/FindManyOptions';
import { Like } from 'typeorm/find-options/operator/Like';
import { Developer } from '../entities/developer.entity';

@Injectable()
export class FindManyDevelopersService {
  constructor(
    @InjectRepository(Developer, DB_NAME)
    private readonly developerRepository: Repository<Developer>,
  ) {}

  async execute(
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
}
