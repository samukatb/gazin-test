import { Repository } from 'typeorm';
import { Level } from '../../../src/modules/level/entities/level.entity';
import { CreateLevelDto } from '../../../src/modules/level/dto/create-level.dto';
import DeleteLevelService from '../../../src/modules/level/services/delete-level.service';
import FindLevelService from '../../../src/modules/level/services/find-level.service';
import { HttpStatus } from '@nestjs/common';
import { AppError } from '../../../src/shared/utils/app-error.exception';
import { SexType } from '../../../src/modules/developer/enums/sex.enum';

describe('DeleteLevelService', () => {
  let deleteLevelService: DeleteLevelService;
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
    deleteLevelService = new DeleteLevelService(
      levelRepository,
      findOneLevelService,
    );
  });

  describe('execute', () => {
    it('should delete a level successfully', async () => {
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

      levelRepository.delete.mockResolvedValue({ affected: 1, raw: 1 });

      const resultDelete = await deleteLevelService.execute(level.id);
      expect(resultDelete).toBeUndefined();
    });

    it('should throw an AppError if the level has developers', async () => {
      const createLevelDto: CreateLevelDto = {
        name: 'Test Level',
      };
      const level: Level = {
        id: 1,
        ...createLevelDto,
        developers: [
          {
            id: 1,
            name: 'Developer 1',
            level_id: 1,
            sex: SexType.MALE,
            hobby: 'Test',
            birthdate: new Date(),
          },
        ],
        totalDevelopers: function (): number {
          return this.developers.length;
        },
      };

      levelRepository.findOne.mockResolvedValue(level);

      await expect(deleteLevelService.execute(level.id)).rejects.toThrow(
        new AppError({
          id: 'LEVEL_HAS_DEVELOPERS',
          status: HttpStatus.BAD_REQUEST,
          message: 'Level has developers',
        }),
      );
    });
  });
});
