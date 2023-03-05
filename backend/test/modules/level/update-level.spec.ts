import { Repository } from 'typeorm';
import { Level } from '../../../src/modules/level/entities/level.entity';
import { CreateLevelDto } from '../../../src/modules/level/dto/create-level.dto';
import UpdateLevelService from '../../../src/modules/level/services/update-level.service';
import FindLevelService from '../../../src/modules/level/services/find-level.service';
import { UpdateLevelDto } from '../../../src/modules/level/dto/update-level.dto';

describe('UpdateLevelService', () => {
  let levelRepository: jest.Mocked<Repository<Level>>;
  let findOneLevelService: FindLevelService;
  let updateLevelService: UpdateLevelService;

  beforeEach(async () => {
    levelRepository = {
      findOne: jest.fn(),
      create: jest.fn(),
      merge: jest.fn(),
      save: jest.fn(),
    } as unknown as jest.Mocked<Repository<Level>>;

    findOneLevelService = new FindLevelService(levelRepository);
    updateLevelService = new UpdateLevelService(
      levelRepository,
      findOneLevelService,
    );
  });

  describe('execute', () => {
    it('should update a level successfully', async () => {
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

      const payload: UpdateLevelDto = {
        name: 'Test Level Updated',
      };

      levelRepository.findOne.mockResolvedValue(level);
      levelRepository.save.mockResolvedValue({ ...level, ...payload });

      const resultUpdate = await updateLevelService.execute(level.id, payload);
      expect(resultUpdate).toEqual({ ...level, ...payload });
    });
  });
});
