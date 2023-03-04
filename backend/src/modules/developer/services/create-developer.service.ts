import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import FindLevelService from 'src/modules/level/services/find-level.service';
import { AppError } from 'src/shared/utils/app-error.exception';
import { DB_NAME } from 'src/shared/utils/constants';
import { Repository } from 'typeorm';
import { CreateDeveloperDto } from '../dto/create-developer.dto';
import { Developer } from '../entities/developer.entity';

@Injectable()
export class CreateDeveloperService {
  constructor(
    @InjectRepository(Developer, DB_NAME)
    private readonly developerRepository: Repository<Developer>,
    private readonly findOneLevel: FindLevelService,
  ) {}

  async execute(createDeveloperDto: CreateDeveloperDto) {
    try {
      await this.findOneLevel.execute(createDeveloperDto.level_id);
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
}
