import { Classroom } from '@app/entities/classroom';
import { ClassroomRepository } from '@app/repositories/classroom-repository';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { PrismaClassroomMapper } from '../mappers/prisma-classroom-mapper';
import { ClassroomWithLockAccessClass } from '../types/classroom-with-lock-access-class';
@Injectable()
export class PrismaClassroomRepositories implements ClassroomRepository {
  constructor(private prismaService: PrismaService) {}

  async listByBlock(block: string): Promise<Classroom[]> {
    const classrooms = await this.prismaService.classroom.findMany({
      where: {
        block: {
          equals: block.toUpperCase(),
        },
      },
      include: {
        access: {
          include: {
            user: true,
          },
          orderBy: {
            openTime: 'asc',
          },
        },
      },
    });

    return classrooms.map(PrismaClassroomMapper.toDomain);
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

  async findById(classroomId: string): Promise<ClassroomWithLockAccessClass> {
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
            initialTimeClass: 'asc',
          },
        },
        lock: true,
        access: {
          include: {
            user: true,
          },
          orderBy: {
            openTime: 'asc',
          },
        },
      },
    });

    return classroom;
  }

  async findByBlockAndName(block: string, name: string): Promise<Classroom> {
    const classroom = await this.prismaService.classroom.findFirst({
      where: {
        block: block,
        name: name,
      },
      include: {
        access: {
          include: {
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

  update(classroomId: string, block: string, name: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

  delete(classroomId: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
