import { ApiProperty } from "@nestjs/swagger";

export class CreateScheduleDto {
    @ApiProperty()
    account_id: number

    @ApiProperty()
    agent_id: number

    @ApiProperty()
    start_time: Date

    @ApiProperty()
    end_time: Date
}
