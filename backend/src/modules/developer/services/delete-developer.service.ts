import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AppError } from 'src/shared/utils/app-error.exception';
import { DB_NAME } from 'src/shared/utils/constants';
import { Repository } from 'typeorm';
import { Developer } from '../entities/developer.entity';
import { FindDeveloperService } from './find-developer.service';

@Injectable()
export class DeleteDeveloperService {
  constructor(
    @InjectRepository(Developer, DB_NAME)
    private readonly developerRepository: Repository<Developer>,
    private readonly findOne: FindDeveloperService,
  ) {}

  async execute(id: number) {
    try {
      await this.findOne.execute(id);
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
