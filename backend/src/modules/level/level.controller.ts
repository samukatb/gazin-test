import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseInterceptors,
  ClassSerializerInterceptor,
  HttpCode,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { CreateLevelDto } from './dto/create-level.dto';
import { UpdateLevelDto } from './dto/update-level.dto';
import { PaginationQueryDto } from '../../shared/dto/pagination.dto';
import CreateLevelService from './services/create-level.service';
import FindManyLevelsService from './services/find-many-levels.service';
import UpdateLevelService from './services/update-level.service';
import DeleteLevelService from './services/delete-level.service';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('levels')
export class LevelController {
  constructor(
    private readonly createLevelService: CreateLevelService,
    private readonly findManyLevelsService: FindManyLevelsService,
    private readonly updateLevelService: UpdateLevelService,
    private readonly deleteLevelService: DeleteLevelService,
  ) {}

  @Post()
  create(@Body() createLevelDto: CreateLevelDto) {
    return this.createLevelService.execute(createLevelDto);
  }

  @Get()
  findAll(@Query() query?: PaginationQueryDto) {
    return this.findManyLevelsService.execute(query);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateLevelDto: UpdateLevelDto) {
    return this.updateLevelService.execute(+id, updateLevelDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.deleteLevelService.execute(+id);
  }
}
