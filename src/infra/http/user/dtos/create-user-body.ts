/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  Length,
  Matches
} from 'class-validator';

export class CreateUserBody {
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
  @Length(5, 30, {message: 'A senha deve ter entre 5 a 30 caracteres'})
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'A senha informada é muito fraca',
  })
  @ApiProperty({
    description: 'Senha do novo usuário',
    example: 'SenhaTeste2023#',
      minLength: 4,
      maxLength: 22    
  })
  password: string;

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
