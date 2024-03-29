import { Classroom } from '@app/entities/classroom';
import { ClassroomRepository } from '@app/repositories/classroom-repository';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { PrismaClassroomMapper } from '../mappers/prisma-classroom-mapper';
@Injectable()
export class PrismaClassroomRepositories implements ClassroomRepository {
  constructor(private prismaService: PrismaService) {}

  async updateLockState(classroomId: string, state: boolean): Promise<void> {
    await this.prismaService.classroom.update({
      where: {
        id: classroomId,
      },
      data: {
        lock: {
          update: {
            isClosed: state,
          },
        },
      },
    });
  }

  async listByBlock(block: string): Promise<Classroom[]> {
    const classrooms = await this.prismaService.classroom.findMany({
      where: {
        block: {
          equals: block.toUpperCase(),
        },
      },
      orderBy: {
        name: 'asc',
      },
      include: {
        lock: true,
        access: {
          include: {
            classroom: true,
            user: true,
          },
          orderBy: {
            openTime: 'asc',
          },
        },
      },
    });

    return classrooms.map(PrismaClassroomMapper.toDomainWithAccessAndLock);
  }

  async create(classroom: Classroom): Promise<string> {
    const classroomPrisma = PrismaClassroomMapper.toPrisma(classroom);

    const classroomCreated = await this.prismaService.classroom.create({
      data: classroomPrisma,
      select: {
        id: true,
      },
    });

    return classroomCreated.id;
  }

  listAll(): Promise<Classroom[]> {
    throw new Error('Method not implemented.');
  }

  async findById(classroomId: string): Promise<Classroom> {
    const classroom = await this.prismaService.classroom.findFirst({
      where: {
        id: classroomId,
      },
      include: {
        Class: {
          include: {
            teacher: true,
            classroom: true,
          },
          orderBy: {
            dayOfTheWeek: 'desc',
          },
        },
        lock: true,
        access: {
          include: {
            classroom: true,
            user: true,
          },
          orderBy: {
            openTime: 'desc',
          },
        },
      },
    });

    return PrismaClassroomMapper.toDomainWithAccessAndClass(classroom);
  }

  async findByBlockAndName(block: string, name: string): Promise<Classroom> {
    const classroom = await this.prismaService.classroom.findFirst({
      where: {
        block: block,
        name: name,
      },
      orderBy: {
        name: 'asc',
      },
      include: {
        lock: true,
        access: {
          include: {
            classroom: true,
            user: true,
          },
          orderBy: {
            openTime: 'asc',
          },
        },
      },
    });

    if (!classroom) return null;

    return PrismaClassroomMapper.toDomain(classroom);
  }

  async update(
    id: string,
    block: string,
    name: string,
    lockId: string | null,
  ): Promise<void> {
    await this.prismaService.classroom.update({
      where: {
        id: id,
      },
      data: {
        block: block,
        name: name,
        lock: {
          connect: {
            id: lockId,
          },
        },
      },
    });
  }

  async delete(classroomId: string): Promise<void> {
    await this.prismaService.classroom.delete({ where: { id: classroomId } });
  }
}
