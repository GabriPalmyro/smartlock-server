import { Lock } from '@app/entities/lock';
import { LockRepository } from '@app/repositories/lock-repository';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { PrismaLockMapper } from '../mappers/prisma-lock-mappers';

@Injectable()
export class PrismaLockRepositories implements LockRepository {
  constructor(private prismaService: PrismaService) {}

  async create(lock: Lock): Promise<string> {
    const lockPrisma = PrismaLockMapper.toPrisma(lock);

    const lockCreated = await this.prismaService.lock.create({
      data: lockPrisma,
      select: {
        id: true,
      },
    });

    return lockCreated.id;
  }

  async listAll(): Promise<Lock[]> {
    const locks = await this.prismaService.lock.findMany({
      include: {
        classroom: true,
      },
    });

    return locks.map(PrismaLockMapper.toDomainWithClassroom);
  }

  async findById(lockId: string): Promise<Lock> {
    const lock = await this.prismaService.lock.findFirst({
      where: {
        id: lockId,
      },
      include: {
        classroom: true,
      },
    });

    return PrismaLockMapper.toDomain(lock);
  }

  async update(lock: Lock, classroomId: string | null): Promise<void> {
    await this.prismaService.lock.update({
      where: {
        id: lock.id,
      },
      data: {
        classroomId: classroomId,
        name: lock.name,
        state: lock.state,
      },
    });
  }

  async updateState(lockId: string, state: boolean): Promise<void> {
    await this.prismaService.lock.update({
      where: {
        id: lockId,
      },
      data: {
        state: state,
      },
    });
  }

  async delete(lockId: string): Promise<void> {
    await this.prismaService.lock.delete({
      where: {
        id: lockId,
      },
    });
  }
}
