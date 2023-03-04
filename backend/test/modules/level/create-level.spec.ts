import { HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import CreateLevelService from '../../../src/modules/level/services/create-level.service';
import { AppError } from '../../../src/shared/utils/app-error.exception';
import { Level } from '../../../src/modules/level/entities/level.entity';
import { CreateLevelDto } from '../../../src/modules/level/dto/create-level.dto';

describe('CreateLevelService', () => {
  let createLevelService: CreateLevelService;
  let levelRepository: jest.Mocked<Repository<Level>>;

  beforeEach(async () => {
    levelRepository = {
      create: jest.fn(),
      save: jest.fn(),
    } as unknown as jest.Mocked<Repository<Level>>;

    createLevelService = new CreateLevelService(levelRepository);
  });

  describe('execute', () => {
    it('should create a new level successfully', async () => {
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

      levelRepository.create.mockReturnValue(level);
      levelRepository.save.mockResolvedValue(level);

      const result = await createLevelService.execute(createLevelDto);

      expect(result).toEqual(level);
      expect(levelRepository.create).toHaveBeenCalledWith(createLevelDto);
      expect(levelRepository.save).toHaveBeenCalledWith(level);
    });

    it('should throw an AppError if there was an error creating the level', async () => {
      const createLevelDto: CreateLevelDto = {
        name: 'Test Level',
      };
      const error = new Error('Error creating level');
      levelRepository.create.mockImplementation(() => {
        throw error;
      });

      await expect(createLevelService.execute(createLevelDto)).rejects.toThrow(
        new AppError({
          id: 'ERROR_CREATING_LEVEL',
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Error creating level',
          error,
        }),
      );
    });

    it('should call levelRepository.create with the correct arguments', async () => {
      const createLevelDto: CreateLevelDto = {
        name: 'Test Level',
      };

      await createLevelService.execute(createLevelDto);

      expect(levelRepository.create).toHaveBeenCalledWith(createLevelDto);
    });

    it('should call levelRepository.save with the correct arguments', async () => {
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
      levelRepository.create.mockReturnValue(level);

      await createLevelService.execute(createLevelDto);

      expect(levelRepository.save).toHaveBeenCalledWith(level);
    });

    it('should throw an AppError if levelRepository.save throws an error', async () => {
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
      const error = new Error('Error saving level');
      levelRepository.create.mockReturnValue(level);
      levelRepository.save.mockImplementation(() => {
        throw error;
      });

      await expect(createLevelService.execute(createLevelDto)).rejects.toThrow(
        new AppError({
          id: 'ERROR_CREATING_LEVEL',
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Error saving level',
          error,
        }),
      );
    });
  });
});
