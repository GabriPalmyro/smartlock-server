import { ClassRepository } from '@app/repositories/class-repository';
import { ClassroomRepository } from '@app/repositories/classroom-repository';
import { UserRepository } from '@app/repositories/user-repository';
import { Module } from '@nestjs/common';
import { PrismaClassRepositories } from './prisma/class/repositories/prisma-class-repository';
import { PrismaClassroomRepositories } from './prisma/classroom/repositories/prisma-classroom-repository';
import { PrismaService } from './prisma/prisma.service';
import { PrismaUserRepositories } from './prisma/user/repositories/prisma-user-repository';

@Module({
  providers: [
    PrismaService,
    { provide: UserRepository, useClass: PrismaUserRepositories },
    { provide: ClassroomRepository, useClass: PrismaClassroomRepositories },
    { provide: ClassRepository, useClass: PrismaClassRepositories },
  ],
  exports: [UserRepository, ClassroomRepository, ClassRepository],
})
export class DatabaseModule {}
