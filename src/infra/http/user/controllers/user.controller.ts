import { CreateUser } from '@app/use-cases/create-user';
import { GetUserById } from '@app/use-cases/get-user-by-id';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserBody } from '../dtos/create-user-body';
import { UserViewModel } from '../view-models/user-view-model';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(
    private createUser: CreateUser,
    private getUserById: GetUserById,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    description:
      'Cria um novo usuário no banco de dados. E retorna um ID do usuário criado',
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
  async create(@Body() body: CreateUserBody): Promise<UserViewModel> {
    const { email, name, password, teacherCode, userTypeId } = body;
    const { user } = await this.createUser.execute({
      email,
      name,
      password,
      teacherCode,
      userTypeId,
    });

    return UserViewModel.toHTTP(user);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    description: 'Busca um usuário pelo id',
  })
  @ApiResponse({
    status: 200,
    description: 'Usuário retornado',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Usuário não encontrado',
  })
  async findUserById(@Param('id') userId: number): Promise<UserViewModel> {
    const { user } = await this.getUserById.execute({
      userId,
    });

    return UserViewModel.toHTTP(user);
  }
}
