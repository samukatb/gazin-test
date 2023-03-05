import { Repository } from 'typeorm';
import { Level } from '../../../src/modules/level/entities/level.entity';
import { CreateLevelDto } from '../../../src/modules/level/dto/create-level.dto';
import { HttpStatus } from '@nestjs/common';
import { AppError } from '../../../src/shared/utils/app-error.exception';
import FindManyLevelsService from '../../../src/modules/level/services/find-many-levels.service';

describe('FindManyLevelService', () => {
  let findManyLevelsService: FindManyLevelsService;
  let levelRepository: jest.Mocked<Repository<Level>>;

  beforeEach(async () => {
    levelRepository = {
      findAndCount: jest.fn(),
    } as unknown as jest.Mocked<Repository<Level>>;

    findManyLevelsService = new FindManyLevelsService(levelRepository);
  });

  describe('execute', () => {
    it('should find many levels successfully', async () => {
      const createLevelDto: CreateLevelDto = {
        name: 'Test Level',
      };
      const level: Level = {
        id: 1,
        ...createLevelDto,
        developers: [],
        totalDevelopers: function (): number {
          return this.developers.length;
        },
      };
      const level2: Level = {
        id: 2,
        ...createLevelDto,
        developers: [],
        totalDevelopers: function (): number {
          return this.developers.length;
        },
      };

      levelRepository.findAndCount.mockResolvedValue([[level, level2], 2]);

      const resultFind = await findManyLevelsService.execute({
        page: 1,
        limit: 10,
      });
      expect(resultFind).toEqual({
        data: [level, level2],
        total: 2,
        currentPage: 1,
        perPage: 10,
      });
    });

    it('should throw an AppError if no data', async () => {
      levelRepository.findAndCount.mockResolvedValue([[], 2]);

      await expect(
        findManyLevelsService.execute({
          page: 1,
          limit: 10,
        }),
      ).rejects.toThrow(
        new AppError({
          id: 'LEVELS_NOT_FOUND',
          status: HttpStatus.BAD_REQUEST,
          message: 'Levels not found',
        }),
      );
    });
  });
});
