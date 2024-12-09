import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from '../../src/prisma/prisma.service';

@Injectable()
export class TasksService {
  constructor(private readonly prisma: PrismaService) {}

  create(createTaskDto: CreateTaskDto) {
    return this.prisma.task.create({ 
      data: {
        account_id: createTaskDto.account_id,
        start_time: createTaskDto.start_time,
        duration: createTaskDto.duration,
        schedule: {
          connect: {
            id: createTaskDto.schedule_id,
          }
        },
        type: createTaskDto.type,
      },
    });
  }

  findAll() {
    return this.prisma.task.findMany();
  }

  findOne(id: number) {
    return this.prisma.task.findUnique({ where: { id } });
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    return this.prisma.task.update({
      where: { id },
      data: {
        account_id: updateTaskDto.account_id,
        start_time: updateTaskDto.start_time,
        duration: updateTaskDto.duration,
        schedule: {
          connect: {
            id: updateTaskDto.schedule_id,
          }
        }
        //type: createTaskDto.type,
      },
    })
  }

  remove(id: number) {
    return this.prisma.task.delete({ where: { id } });
  }
}
