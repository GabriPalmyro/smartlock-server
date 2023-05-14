import { CreateUser } from '@app/use-cases/create-user';
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateUserBody } from '../dtos/create-user-body';
import { UserIdViewModel } from '../view-models/user-id-view-model';

@Controller('user')
export class UserController {
  constructor(private createUser: CreateUser) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    description:
      'Cria um novo usuário no banco de dados e envia o email de verificação de conta. E retorna um ID do usuário criado',
  })
  @ApiResponse({
    status: 201,
    description: 'A conta foi criado com sucesso.',
  })
  @ApiResponse({
    status: 400,
    description: `
      Diversas mensagens de erros podem ser retornadas como:
       - 'A senha informada é muito fraca'
       - 'O e-mail informado está inválido'
       - 'O nome deve ter entre 4 a 150 caracteres'
      `,
  })
  @ApiResponse({
    status: 403,
    description:
      'Não foi possível criar uma nova conta com as credenciais fornecidas.',
  })
  async create(@Body() body: CreateUserBody): Promise<UserIdViewModel> {
    const { email, name, password, teacherCode, userTypeId } = body;
    const id = await this.createUser.execute({
      email,
      name,
      password,
      teacherCode,
      userTypeId,
    });

    return { id: id };
  }
}
