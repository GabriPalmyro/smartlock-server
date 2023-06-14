import { UserRepository } from '@app/repositories/user/user-repository';
import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { PrismaUserRepositories } from './prisma/user/repositories/prisma-user-repository';

@Module({
  providers: [
    PrismaService,
    { provide: UserRepository, useClass: PrismaUserRepositories },
  ],
  exports: [UserRepository],
})
export class DatabaseModule {}
