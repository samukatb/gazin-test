import { Module } from '@nestjs/common';
import { LevelController } from './level.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Level } from './entities/level.entity';
import { DB_NAME } from '../../shared/utils/constants';
import CreateLevelService from './services/create-level.service';
import UpdateLevelService from './services/update-level.service';
import FindManyLevelsService from './services/find-many-levels.service';
import DeleteLevelService from './services/delete-level.service';
import FindLevelService from './services/find-level.service';

@Module({
  imports: [TypeOrmModule.forFeature([Level], DB_NAME)],
  controllers: [LevelController],
  providers: [
    CreateLevelService,
    UpdateLevelService,
    FindManyLevelsService,
    DeleteLevelService,
    FindLevelService,
  ],
  exports: [FindLevelService, TypeOrmModule],
})
export class LevelModule {}
