import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import FindLevelService from 'src/modules/level/services/find-level.service';
import { AppError } from 'src/shared/utils/app-error.exception';
import { DB_NAME } from 'src/shared/utils/constants';
import { Repository } from 'typeorm';
import { UpdateDeveloperDto } from '../dto/update-developer.dto';
import { Developer } from '../entities/developer.entity';
import { FindDeveloperService } from './find-developer.service';

@Injectable()
export class UpdateDeveloperService {
  constructor(
    @InjectRepository(Developer, DB_NAME)
    private readonly developerRepository: Repository<Developer>,
    private readonly findOne: FindDeveloperService,
    private readonly findOneLevel: FindLevelService,
  ) {}

  async execute(id: number, updateDeveloperDto: UpdateDeveloperDto) {
    try {
      await this.findOneLevel.execute(updateDeveloperDto.level_id);
    } catch (error) {
      throw new AppError({
        id: 'LEVEL_NOT_FOUND',
        status: HttpStatus.BAD_REQUEST,
        message: 'Level not found',
        error,
      });
    }

    const developer = await this.findOne.execute(id);

    const updateddeveloper = this.developerRepository.merge(
      developer,
      updateDeveloperDto,
    );

    return await this.developerRepository.save(updateddeveloper);
  }
}
