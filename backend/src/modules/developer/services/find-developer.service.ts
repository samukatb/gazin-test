import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AppError } from 'src/shared/utils/app-error.exception';
import { DB_NAME } from 'src/shared/utils/constants';
import { Repository } from 'typeorm';
import { Developer } from '../entities/developer.entity';

@Injectable()
export class FindDeveloperService {
  constructor(
    @InjectRepository(Developer, DB_NAME)
    private readonly developerRepository: Repository<Developer>,
  ) {}

  async execute(id: number) {
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
