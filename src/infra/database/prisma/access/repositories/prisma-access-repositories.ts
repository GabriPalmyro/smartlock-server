import { Access } from '@app/entities/access';
import { AccessRepository } from '@app/repositories/access_repository';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { PrismaAccessMapper } from '../mappers/prisma-access-mapper';

@Injectable()
export class PrismaAccessRepositories implements AccessRepository {
  constructor(private prismaService: PrismaService) {}
  async findLastClassroomAccess(classroomId: string): Promise<Access> {
    const access = await this.prismaService.access.findFirst({
      where: {
        classroomId: classroomId,
        closeTime: null,
      },
      orderBy: {
        openTime: 'desc',
      },
      include: {
        classroom: true,
        user: true,
      },
    });

    return PrismaAccessMapper.toDomain(access);
  }

  async create(access: Access): Promise<string> {
    const accessPrisma = PrismaAccessMapper.toPrisma(access);

    const classroomCreated = await this.prismaService.access.create({
      data: accessPrisma,
      select: {
        id: true,
      },
    });

    return classroomCreated.id;
  }

  async listAll(): Promise<Access[]> {
    const access = await this.prismaService.access.findMany({
      include: {
        classroom: true,
        user: true,
      },
    });

    return access.map(PrismaAccessMapper.toDomain);
  }

  async findById(accessId: string): Promise<Access> {
    const access = await this.prismaService.access.findFirst({
      where: {
        id: accessId,
      },
      include: {
        classroom: true,
        user: true,
      },
    });

    return PrismaAccessMapper.toDomain(access);
  }

  async update(access: Access): Promise<void> {
    const accessPrisma = PrismaAccessMapper.toPrisma(access);

    await this.prismaService.access.update({
      where: {
        id: access.id,
      },
      data: accessPrisma,
    });
  }

  async delete(accessId: string): Promise<void> {
    await this.prismaService.access.delete({
      where: {
        id: accessId,
      },
    });
  }
}
