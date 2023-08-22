import { AccessRepository } from '@app/repositories/access_repository';
import { ClassRepository } from '@app/repositories/class-repository';
import { ClassroomRepository } from '@app/repositories/classroom-repository';
import { LockRepository } from '@app/repositories/lock-repository';
import { UserRepository } from '@app/repositories/user-repository';
import { Module } from '@nestjs/common';
import { PrismaAccessRepositories } from './prisma/access/repositories/prisma-access-repositories';
import { PrismaClassRepositories } from './prisma/class/repositories/prisma-class-repository';
import { PrismaClassroomRepositories } from './prisma/classroom/repositories/prisma-classroom-repository';
import { PrismaLockRepositories } from './prisma/lock/repositories/prisma-lock-repositories';
import { PrismaService } from './prisma/prisma.service';
import { PrismaUserRepositories } from './prisma/user/repositories/prisma-user-repository';

@Module({
  providers: [
    PrismaService,
    { provide: UserRepository, useClass: PrismaUserRepositories },
    { provide: ClassroomRepository, useClass: PrismaClassroomRepositories },
    { provide: ClassRepository, useClass: PrismaClassRepositories },
    { provide: LockRepository, useClass: PrismaLockRepositories },
    { provide: AccessRepository, useClass: PrismaAccessRepositories },
  ],
  exports: [
    UserRepository,
    ClassroomRepository,
    ClassRepository,
    LockRepository,
    AccessRepository,
  ],
})
export class DatabaseModule {}
