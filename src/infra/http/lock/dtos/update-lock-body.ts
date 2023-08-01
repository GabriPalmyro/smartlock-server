/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsString
} from 'class-validator';

export class UpdateLockBody {
  @IsString()
  @ApiProperty({
    description: 'ID da trava',
    example: '2312312fdewvwe-213123cacqw-edqcd1123'
  })
  id: string;

  @IsString()
  @ApiProperty({
    description: 'Nome da trava',
    example: '100'
  })
  name: string;

  @IsBoolean()
  @ApiProperty({
    description: 'Estado da trava',
    example: false
  })
  state: boolean;

  @IsString()
  @ApiProperty({
    description: 'Id da sala que vai se conectar',
    example: '2312312fdewvwe-213123cacqw-edqcd1123'
  })
  classroomId: string | null;
}
