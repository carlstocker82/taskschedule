import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { Type } from '@prisma/client';
import { PrismaService } from '../../src/prisma/prisma.service';

describe('TasksService', () => {
  let service: TasksService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: PrismaService,
          useValue: {
            task: {
              create: jest.fn(),
              findMany: jest.fn(),
              findUnique: jest.fn(),
              update: jest.fn(),
              delete: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<TasksService>(TasksService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a task', async () => {
      const createdTaskDto = {
        account_id: 1,
        start_time: new Date(),
        duration: 120,
        schedule_id: 1,
        type: 'meeting' as Type,
      };
      const mockResult = { id: 1, ...createdTaskDto };
      jest.spyOn(prisma.task, 'create').mockResolvedValue(mockResult);

      const result = await service.create(createdTaskDto);

      expect(result).toEqual(mockResult);
      expect(prisma.task.create).toHaveBeenCalledWith({
        data: {
          account_id: createdTaskDto.account_id,
          start_time: createdTaskDto.start_time,
          duration: createdTaskDto.duration,
          schedule: { connect: { id: createdTaskDto.schedule_id } },
          type: createdTaskDto.type,
        },
      });
    
    });
  });

  describe('findAll', () => {
    it('should return all tasks', async () => {
      const mockResult = [{
        id: 1,
        account_id: 1,
        start_time: new Date(),
        duration: 120,
        schedule_id: 1,
        type: 'meeting' as Type,
      }];
      jest.spyOn(prisma.task, 'findMany').mockResolvedValue(mockResult);

      const result = await service.findAll();
      expect(result).toEqual(mockResult);
      expect(prisma.task.findMany).toHaveBeenCalled();

    });
  });

  describe('findOne', () => {
    it('should return a single task by ID', async () => {
      const id = 1;
      const mockResult = { 
        id,
        account_id: 1,
        start_time: new Date(),
        duration: 120,
        schedule_id: 1,
        type: 'meeting' as Type,
      };
      jest.spyOn(prisma.task, 'findUnique').mockResolvedValue(mockResult);

      const result = await service.findOne(id);
      expect(result).toEqual(mockResult);
      expect(prisma.task.findUnique).toHaveBeenCalledWith({ where: { id } });

    });

    it('should return null if task not found', async () => {
      const id = 999;
      jest.spyOn(prisma.task, 'findUnique').mockResolvedValue(null);

      const result = await service.findOne(id);
      expect(result).toBeNull();
      expect(prisma.task.findUnique).toHaveBeenCalledWith({ where: { id } });

    });
  });

  describe('update', () => {
    it('should update a task', async () => {
      const id = 1;
      const updateTaskDto = { 
        account_id: 2,
        start_time: new Date(),
        duration: 60,
        schedule_id: 2,
        type: 'meeting' as Type,
       };
      const mockResult = { id, ...updateTaskDto };
      jest.spyOn(prisma.task, 'update').mockResolvedValue(mockResult);

      const result = await service.update(id, updateTaskDto);
      expect(result).toEqual(mockResult);
      expect(prisma.task.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: {
          account_id: updateTaskDto.account_id,
          start_time: updateTaskDto.start_time,
          duration: updateTaskDto.duration,
          schedule: { connect: { id: updateTaskDto.schedule_id } },
        },
      });


    });
  });

  describe('remove', () => {
    it('should delete a task', async () => {
      const id = 1;
      const mockResult = { 
        id,
        account_id: 2,
        start_time: new Date(),
        duration: 60,
        schedule_id: 2,
        type: 'meeting' as Type,
      };
      jest.spyOn(prisma.task, 'delete').mockResolvedValue(mockResult);

      const result = await service.remove(id);
      expect(result).toEqual(mockResult);
      expect(prisma.task.delete).toHaveBeenCalledWith({ where: { id } });
    });
  });
});
