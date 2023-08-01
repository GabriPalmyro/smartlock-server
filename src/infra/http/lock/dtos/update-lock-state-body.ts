/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsString
} from 'class-validator';

export class UpdateLockStateBody {
  @IsString()
  @ApiProperty({
    description: 'ID da trava',
    example: '2312312fdewvwe-213123cacqw-edqcd1123'
  })
  lockId: string;

  @IsBoolean()
  @ApiProperty({
    description: 'Estado da trava',
    example: false
  })
  state: boolean;

}
