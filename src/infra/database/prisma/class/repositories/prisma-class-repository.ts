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
    teacherId: number,
    classroomId: number,
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
        classroom: true,
      },
    });

    return PrismaClassMapper.toDomain(classCreated);
  }

  listAll(): Promise<Class[]> {
    throw new Error('Method not implemented.');
  }

  findById(classId: number): Promise<Class> {
    throw new Error('Method not implemented.');
  }

  update(classId: number): Promise<void> {
    throw new Error('Method not implemented.');
  }

  delete(classId: number): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
