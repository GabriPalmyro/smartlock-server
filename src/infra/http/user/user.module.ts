import { CreateUser } from '@app/use-cases/user/create-user';
import { GetUserById } from '@app/use-cases/user/get-user-by-id';
import { ListAllUsers } from '@app/use-cases/user/list-all-users';
import { LoginWithCodeAndPassword } from '@app/use-cases/user/login-user-code-password';
import { DatabaseModule } from '@infra/database/database.module';
import { MqttModule } from '@infra/mqtt/mqtt.module';
import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';

@Module({
  imports: [DatabaseModule, MqttModule],
  controllers: [UserController],
  providers: [CreateUser, GetUserById, LoginWithCodeAndPassword, ListAllUsers],
})
export class UserModule {}
