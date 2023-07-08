/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  Length
} from 'class-validator';

export class CreateClassroomBody {
  @IsString()
  @Length(1, 5, {message: 'O nome da sala de aula registrada sem o nome do bloco'})
  @ApiProperty({
    description: 'Nome da sala',
    example: '115'
  })
  name: string;

  @IsString()
  @Length(1, 5, {message: 'O bloco em que a sala se encontra'})
  @ApiProperty({
    description: 'Bloco da Sala, ex: A | B | C | D | E',
    example: 'A'
  })
  block: string;
}
