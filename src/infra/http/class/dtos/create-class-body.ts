/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import {
    IsDateString,
    IsNumber,
    IsString,
    Length
} from 'class-validator';

export class CreateClassBody {
    @IsString()
    @Length(1, 120, { message: 'O nome da materia da aula' })
    @ApiProperty({
        description: 'A materia da aula',
        example: 'Robótica'
    })
    subject: string;

    @IsNumber()
    @ApiProperty({
        description: 'O dia da semana que essa aula é dada (seg = 1 até sabado = 6)',
        example: 1
    })
    dayOfTheWeek: number;

    @IsDateString()
    @ApiProperty({
        description: 'Dia de inicio dessa aula',
        example: '2023-02-01T00:00:00.000Z'
    })
    initialDay: Date;

    @IsDateString()
    @ApiProperty({
        description: 'Dia de fim dessa aula',
        example: '2023-07-01T00:00:00.000Z'
    })
    endDay: Date;

    @IsDateString()
    @ApiProperty({
        description: 'Horário de início dessa aula',
        example: '1970-01-01T13:30:00.000Z'
    })
    initialTimeClass: Date;

    @IsDateString()
    @ApiProperty({
        description: 'Horário de fim dessa aula',
        example: '1970-01-01T17:10:00.000Z'
    })
    endTimeClass: Date;

    @IsNumber()
    @ApiProperty({
        description: 'ID do professor que vai ministrar a aula',
        example: 1
    })
    teacherId: number | null;

    @IsNumber()
    @ApiProperty({
        description: 'ID da sala em que a aula vai ser ministraDA',
        example: 12
    })
    classroomId: number | null;
}
