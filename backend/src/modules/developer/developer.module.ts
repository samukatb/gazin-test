import { Module } from '@nestjs/common';
import { DeveloperController } from './developer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Developer } from './entities/developer.entity';
import { LevelModule } from '../level/level.module';
import { DB_NAME } from 'src/shared/utils/constants';
import { CreateDeveloperService } from './services/create-developer.service';
import { UpdateDeveloperService } from './services/update-developer.service';
import { FindDeveloperService } from './services/find-developer.service';
import { FindManyDevelopersService } from './services/find-many-developers.service';
import { DeleteDeveloperService } from './services/delete-developer.service';

@Module({
  imports: [TypeOrmModule.forFeature([Developer], DB_NAME), LevelModule],
  controllers: [DeveloperController],
  providers: [
    CreateDeveloperService,
    UpdateDeveloperService,
    FindDeveloperService,
    FindManyDevelopersService,
    DeleteDeveloperService,
  ],
})
export class DeveloperModule {}
