import { CreateUser } from '@app/use-cases/user/create-user';
import { DeleteById } from '@app/use-cases/user/delete-user';
import { GetUserById } from '@app/use-cases/user/get-user-by-id';
import { ListAllTeachers } from '@app/use-cases/user/list-all-teachers';
import { ListAllUsers } from '@app/use-cases/user/list-all-users';
import { LoginWithCodeAndPassword } from '@app/use-cases/user/login-user-code-password';
import { UpdateUser } from '@app/use-cases/user/update-user';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserBody } from '../dtos/create-user-body';
import { LoginUserBody } from '../dtos/login-user-body';
import { UpdateUserBody } from '../dtos/update-user-body';
import { TeacherViewModel } from '../view-models/teacher-view-model';
import { UserViewModel } from '../view-models/user-view-model';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(
    private createUser: CreateUser,
    private getUserById: GetUserById,
    private deleteUserById: DeleteById,
    private updateUserUseCase: UpdateUser,
    private loginWithCodeAndPassword: LoginWithCodeAndPassword,
    private listAllUsers: ListAllUsers,
    private listAllTeachers: ListAllTeachers,
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
    const { email, name, password, code, userTypeId } = body;
    const { user } = await this.createUser.execute({
      email,
      name,
      password,
      code,
      userTypeId,
    });

    return UserViewModel.toHTTP(user);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    description: 'Faz o login do usuário com as credenciais',
  })
  @ApiResponse({
    status: 200,
    description: 'Usuário retornado',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Usuário não encontrado',
  })
  async login(@Body() body: LoginUserBody): Promise<UserViewModel> {
    const { code, password } = body;

    const { user } = await this.loginWithCodeAndPassword.execute({
      code,
      password,
    });

    return UserViewModel.toHTTP(user);
  }

  @Patch()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    description: 'Editar informações de um usuário',
  })
  @ApiResponse({
    status: 200,
    description: 'Usuário Editado',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Usuário não encontrado',
  })
  async update(@Body() body: UpdateUserBody): Promise<void> {
    const { code, email, name, userId, userTypeId } = body;

    await this.updateUserUseCase.execute({
      userId,
      email,
      name,
      code,
      userTypeId,
    });
  }

  @Get('all')
  async listAll(): Promise<UserViewModel[]> {
    const { users } = await this.listAllUsers.execute();

    return users.map(UserViewModel.toHTTP);
  }

  @Get('all/teachers')
  async listTeachers(): Promise<UserViewModel[]> {
    const { teachers } = await this.listAllTeachers.execute();

    return teachers.map(TeacherViewModel.toHTTP);
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
  async findUserById(@Param('id') userId: string): Promise<UserViewModel> {
    const { user } = await this.getUserById.execute({
      userId,
    });

    return UserViewModel.toHTTP(user);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    description: 'Deleta um usuário pelo id',
  })
  @ApiResponse({
    status: 200,
    description: 'Usuário Deletado',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Usuário não encontrado',
  })
  async deleteUserByID(@Param('id') userId: string): Promise<void> {
    await this.deleteUserById.execute({
      userId,
    });
  }
}
