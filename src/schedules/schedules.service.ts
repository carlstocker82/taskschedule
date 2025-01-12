import { Injectable } from '@nestjs/common';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { PrismaService } from '../../src/prisma/prisma.service';

@Injectable()
export class SchedulesService {
  constructor(private readonly prisma: PrismaService) {}

  create(createScheduleDto: CreateScheduleDto) {
    return this.prisma.schedule.create({ data: createScheduleDto });
  }

  findAll() {
    return this.prisma.schedule.findMany();
  }

  findOne(id: number) {
    return this.prisma.schedule.findUnique({ where: { id } });
  }

  update(id: number, updateScheduleDto: UpdateScheduleDto) {
    return this.prisma.schedule.update({
      where: { id },
      data: updateScheduleDto,
    });
  }

  remove(id: number) {
    return this.prisma.schedule.delete({ where: { id } });
  }
}
