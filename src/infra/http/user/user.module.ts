import { CreateUser } from '@app/use-cases/create-user';
import { GetUserById } from '@app/use-cases/get-user-by-id';
import { DatabaseModule } from '@infra/database/database.module';
import { MqttModule } from '@infra/mqtt/mqtt.module';
import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';

@Module({
  imports: [DatabaseModule, MqttModule],
  controllers: [UserController],
  providers: [CreateUser, GetUserById],
})
export class UserModule {}
