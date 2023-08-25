import { CreateUser } from '@app/use-cases/user/create-user';
import { GetUserById } from '@app/use-cases/user/get-user-by-id';
import { ListAllTeachers } from '@app/use-cases/user/list-all-teachers';
import { ListAllUsers } from '@app/use-cases/user/list-all-users';
import { LoginWithCodeAndPassword } from '@app/use-cases/user/login-user-code-password';
import { UpdateUser } from '@app/use-cases/user/update-user';
import { DatabaseModule } from '@infra/database/database.module';
import { MqttModule } from '@infra/mqtt/mqtt.module';
import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';

@Module({
  imports: [DatabaseModule, MqttModule],
  controllers: [UserController],
  providers: [
    CreateUser,
    GetUserById,
    LoginWithCodeAndPassword,
    ListAllUsers,
    UpdateUser,
    ListAllTeachers,
  ],
})
export class UserModule {}
