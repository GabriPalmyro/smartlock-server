/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  Length
} from 'class-validator';

export class UpdateUserBody {
  @IsString()
  @ApiProperty({
    description: 'ID do usuario',
  })
  userId: string;

  @IsString()
  @Length(4, 150, {message: 'O nome deve ter entre 4 a 150 caracteres'})
  @ApiProperty({
    description: 'Nome do novo usuário',
    example: 'Gabriel Palmyro'
  })
  name: string;

  @IsEmail({}, {message: 'O e-mail informado está inválido'})
  @ApiProperty({
    description: 'E-mail único do novo usuário',
    example: 'email@gmail.com'
  })
  email: string;

  @IsString()
  @ApiProperty({
    description: 'Número do prontuário de acesso do usuário',
    example: 'BI300XXXX'
  })
  code: string;

  @IsString()
  @ApiProperty({
    description: 'ID do tipo de usuário selecionado',
    example: '6716f045-b1d3-4802-aed2-b34323af9f4'
  })
  userTypeId: string;
}
