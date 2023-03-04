import { Repository } from 'typeorm';
import { Level } from '../../../src/modules/level/entities/level.entity';
import { CreateLevelDto } from '../../../src/modules/level/dto/create-level.dto';
import FindLevelService from '../../../src/modules/level/services/find-level.service';
import { HttpStatus } from '@nestjs/common';
import { AppError } from '../../../src/shared/utils/app-error.exception';

describe('FindLevelService', () => {
  let findOneLevelService: FindLevelService;
  let levelRepository: jest.Mocked<Repository<Level>>;

  beforeEach(async () => {
    levelRepository = {
      create: jest.fn(),
      save: jest.fn(),
      find: jest.fn(),
      findOne: jest.fn(),
      delete: jest.fn(),
      createQueryBuilder: jest.fn(),
    } as unknown as jest.Mocked<Repository<Level>>;

    findOneLevelService = new FindLevelService(levelRepository);
  });

  describe('execute', () => {
    it('should find a level successfully', async () => {
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

      levelRepository.findOne.mockResolvedValue(level);

      const resultFind = await findOneLevelService.execute(level.id);
      expect(resultFind).toEqual(level);
    });

    it('should throw an AppError if the level doenst exist', async () => {
      await expect(findOneLevelService.execute(1)).rejects.toThrow(
        new AppError({
          id: 'LEVEL_NOT_FOUND',
          status: HttpStatus.BAD_REQUEST,
          message: 'Level not found',
        }),
      );
    });
  });
});
