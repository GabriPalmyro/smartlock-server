/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import {
    IsString
} from 'class-validator';

export class CreateAlertBody {
    @IsString()
    @ApiProperty({
        description: 'Mensagem do alerta',
        example: 'ARROMBADO'
    })
    message: string;

    @IsString()
    @ApiProperty({
        description: 'ID da sala em que a aula alertas',
        example: '6716f045-b1d3-4802-aed2-b34323af9f4'
    })
    classroomId: string | null;
}
