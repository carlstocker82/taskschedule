import { ApiProperty } from '@nestjs/swagger';
import { Type } from '@prisma/client';

export class CreateTaskDto {
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
