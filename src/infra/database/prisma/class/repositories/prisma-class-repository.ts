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

    return PrismaClassMapper.toDomainWithTeacherAndClassroom(classCreated);
  }

  async listAll(): Promise<Class[]> {
    const classess = await this.prismaService.class.findMany({
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

    return classess.map(PrismaClassMapper.toDomainWithTeacherAndClassroom);
  }

  async findById(classId: string): Promise<Class> {
    const classQuery = await this.prismaService.class.findFirst({
      where: { id: classId },
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

    return PrismaClassMapper.toDomainWithTeacherAndClassroom(classQuery);
  }

  async update(
    classModel: Class,
    teacherId: string,
    classroomId: string,
  ): Promise<void> {
    const classPrisma = PrismaClassMapper.toPrisma(
      classModel,
      teacherId,
      classroomId,
    );

    await this.prismaService.class.update({
      where: {
        id: classModel.id,
      },
      data: classPrisma,
    });
  }

  async delete(classId: string): Promise<void> {
    await this.prismaService.class.delete({
      where: {
        id: classId,
      },
    });
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

    return classes.map(PrismaClassMapper.toDomainWithTeacherAndClassroom);
  }
}
