import { Task } from "@prisma/client";
import { ApiProperty } from "@nestjs/swagger";
import { Type } from "@prisma/client";

export class TaskEntity implements Task {
    @ApiProperty()
    id: number

    @ApiProperty()
    account_id: number

    @ApiProperty()
    schedule_id: number

    @ApiProperty()
    start_time: Date

    @ApiProperty()
    duration: number

    @ApiProperty()
    type: Type
}
