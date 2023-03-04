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
import { PaginationQueryDto } from 'src/shared/dto/pagination.dto';
import { CreateDeveloperDto } from './dto/create-developer.dto';
import { UpdateDeveloperDto } from './dto/update-developer.dto';
import { CreateDeveloperService } from './services/create-developer.service';
import { DeleteDeveloperService } from './services/delete-developer.service';
import { FindManyDevelopersService } from './services/find-many-developers.service';
import { UpdateDeveloperService } from './services/update-developer.service';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('developers')
export class DeveloperController {
  constructor(
    private readonly createDeveloperService: CreateDeveloperService,
    private readonly findManyDeveloperService: FindManyDevelopersService,
    private readonly updateDeveloperService: UpdateDeveloperService,
    private readonly deleteDeveloperService: DeleteDeveloperService,
  ) {}

  @Post()
  create(@Body() createDeveloperDto: CreateDeveloperDto) {
    return this.createDeveloperService.execute(createDeveloperDto);
  }

  @Get()
  findAll(@Query() query: PaginationQueryDto) {
    return this.findManyDeveloperService.execute(query);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateDeveloperDto: UpdateDeveloperDto,
  ) {
    return this.updateDeveloperService.execute(+id, updateDeveloperDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.deleteDeveloperService.execute(+id);
  }
}
