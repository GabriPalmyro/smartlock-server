import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginUserBody {
  @IsString()
  @ApiProperty({
    description: 'Prontuário do usuário',
    example: 'BI3003795',
  })
  code: string;

  @IsString()
  @ApiProperty({
    description: 'Senha do usuário',
    example: 'Teste123',
  })
  password: string;
}
