import { Classroom } from '@app/entities/classroom';
import { ClassroomRepository } from '@app/repositories/classroom-repository';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { PrismaClassroomMapper } from '../mappers/prisma-classroom-mapper';
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
    });

    return classrooms.map(PrismaClassroomMapper.toDomain);
  }

  async create(classroom: Classroom): Promise<number> {
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
  findById(classroomId: number): Promise<Classroom> {
    throw new Error('Method not implemented.');
  }
  findByBlockAndName(block: string, name: string): Promise<Classroom> {
    throw new Error('Method not implemented.');
  }
  update(classroomId: number, block: string, name: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  delete(classroomId: number): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
