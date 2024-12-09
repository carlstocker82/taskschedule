import { Schedule } from "@prisma/client";
import { ApiProperty } from "@nestjs/swagger";
import { TaskEntity } from '../../../src/tasks/entities/task.entity';

export class ScheduleEntity implements Schedule {
    @ApiProperty()
    id: number;

    @ApiProperty()
    account_id: number;

    @ApiProperty()
    agent_id: number;

    @ApiProperty()
    start_time: Date

    @ApiProperty()
    end_time: Date

    @ApiProperty({ type: [TaskEntity] })
    tasks?: TaskEntity[] 
}
