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
import { DeveloperService } from './developer.service';
import { CreateDeveloperDto } from './dto/create-developer.dto';
import { UpdateDeveloperDto } from './dto/update-developer.dto';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('developers')
export class DeveloperController {
  constructor(private readonly developerService: DeveloperService) {}

  @Post()
  create(@Body() createDeveloperDto: CreateDeveloperDto) {
    return this.developerService.create(createDeveloperDto);
  }

  @Get()
  findAll(@Query() query: PaginationQueryDto) {
    return this.developerService.findAll(query);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateDeveloperDto: UpdateDeveloperDto,
  ) {
    return this.developerService.update(+id, updateDeveloperDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.developerService.remove(+id);
  }
}
