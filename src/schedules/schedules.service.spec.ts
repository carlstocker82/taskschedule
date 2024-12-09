import { Test, TestingModule } from '@nestjs/testing';
import { SchedulesService } from './schedules.service';
import { PrismaService } from '../../src/prisma/prisma.service';

describe('SchedulesService', () => {
  let service: SchedulesService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SchedulesService,
        {
          provide: PrismaService,
          useValue: {
            schedule: {
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

    service = module.get<SchedulesService>(SchedulesService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a schedule', async () => {
      const createScheduleDto = {
        account_id: 123,
        agent_id: 346,
        start_time: new Date('2024-01-01T08:00:00Z'),
        end_time: new Date('2024-01-01T10:00:00Z'),
      };
      const mockResult = { id: 1, ...createScheduleDto };
      jest.spyOn(prisma.schedule, 'create').mockResolvedValue(mockResult);

      const result = await service.create(createScheduleDto);
      expect(result).toEqual(mockResult);
      expect(prisma.schedule.create).toHaveBeenCalledWith({ data: createScheduleDto });
    });
  });

  describe('findAll', () => {
    it('should return all schedules', async () => {
      const mockResult = [{
          id: 1,
          account_id: 123,
          agent_id: 346,
          start_time: new Date('2024-01-01T08:00:00Z'),
          end_time: new Date('2024-01-01T10:00:00Z'),
       }];
      jest.spyOn(prisma.schedule, 'findMany').mockResolvedValue(mockResult);

      const result = await service.findAll();
      expect(result).toEqual(mockResult);
      expect(prisma.schedule.findMany).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single schedule by id', async () => {
      const id = 1;
      const mockResult = { 
        id,
        account_id: 123,
        agent_id: 346,
        start_time: new Date('2024-01-01T08:00:00Z'),
        end_time: new Date('2024-01-01T10:00:00Z'),
      };
      jest.spyOn(prisma.schedule, 'findUnique').mockResolvedValue(mockResult);

      const result = await service.findOne(id);
      expect(result).toEqual(mockResult);
      expect(prisma.schedule.findUnique).toHaveBeenCalledWith({ where: { id } });
    });

    it('should return null if schedule is not found', async () => {
      const id = 999;
      jest.spyOn(prisma.schedule, 'findUnique').mockResolvedValue(null);

      const result = await service.findOne(id);
      expect(result).toBeNull();
      expect(prisma.schedule.findUnique).toHaveBeenCalledWith({ where: { id } });
    });
  });

  describe('update', () => {
    it('should update a schedule', async () => {
      const id = 1;
      const updateScheduleDto = { 
        account_id: 123,
        agent_id: 346,
        start_time: new Date('2024-01-01T08:00:00Z'),
        end_time: new Date('2024-01-01T10:00:00Z'),
       };
      const mockResult = { id, ...updateScheduleDto };
      jest.spyOn(prisma.schedule, 'update').mockResolvedValue(mockResult);

      const result = await service.update(id, updateScheduleDto);
      expect(result).toEqual(mockResult);
      expect(prisma.schedule.update).toHaveBeenCalledWith({
        where: { id },
        data: updateScheduleDto,
      });
    });
  });

  describe('remove', () => {
    it('should delete a schedule', async () => {
      const id = 1;
      const mockResult = { 
        id,
        account_id: 123,
        agent_id: 346,
        start_time: new Date('2024-01-01T08:00:00Z'),
        end_time: new Date('2024-01-01T10:00:00Z'),

      };
      jest.spyOn(prisma.schedule, 'delete').mockResolvedValue(mockResult);

      const result = await service.remove(id);
      expect(result).toEqual(mockResult);
      expect(prisma.schedule.delete).toHaveBeenCalledWith({ where: { id } });
    });
  });
});
