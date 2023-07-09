import { Class } from '@app/entities/Class';
import { ClassRepository } from '@app/repositories/class-repository';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { PrismaClassMapper } from '../mappers/prisma-class-mapper';
@Injectable()
export class PrismaClassRepositories implements ClassRepository {
  constructor(private prismaService: PrismaService) {}

  async create(
    classModel: Class,
    teacherId: string,
    classroomId: string,
  ): Promise<Class> {
    const classPrisma = PrismaClassMapper.toPrisma(
      classModel,
      teacherId,
      classroomId,
    );

    const classCreated = await this.prismaService.class.create({
      data: classPrisma,
      include: {
        teacher: true,
        classroom: {
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
        },
      },
    });

    return PrismaClassMapper.toDomain(classCreated);
  }

  listAll(): Promise<Class[]> {
    throw new Error('Method not implemented.');
  }

  findById(classId: string): Promise<Class> {
    throw new Error('Method not implemented.');
  }

  update(classId: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

  delete(classId: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async listAllClassFromTeacherIdFromToday(
    teacherId: string,
    todayDayOfWeek: number,
  ): Promise<Class[]> {
    const today = new Date();

    const classes = await this.prismaService.class.findMany({
      where: {
        dayOfTheWeek: todayDayOfWeek,
        teacherId: teacherId,
        initialDay: {
          lte: today,
        },
        endDay: {
          gte: today,
        },
      },
      include: {
        teacher: true,
        classroom: {
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
        },
      },
    });

    return classes.map(PrismaClassMapper.toDomain);
  }
}
