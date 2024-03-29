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
    @Length(5, 6, { message: 'A sigla da matéria' })
    @ApiProperty({
        description: 'A sigla da matéria que está sendo criada',
        example: 'PROG1'
    })
    name: string;

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

    @IsString()
    @ApiProperty({
        description: 'ID do professor que vai ministrar a aula',
        example: '6716f045-b1d3-4802-aed2-b34323af9f4'
    })
    teacherId: string | null;

    @IsString()
    @ApiProperty({
        description: 'ID da sala em que a aula vai ser ministraDA',
        example: '6716f045-b1d3-4802-aed2-b34323af9f4'
    })
    classroomId: string | null;
}
