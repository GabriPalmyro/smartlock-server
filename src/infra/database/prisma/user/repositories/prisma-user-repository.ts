import { User } from '@app/entities/user';
import { UserType } from '@app/entities/user-type';
import { UserRepository } from '@app/repositories/user-repository';
import { getBrasiliaTime } from '@helpers/date';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { PrismaUserMapper } from '../mappers/prisma-user-mapper';
import { PrismaUserTypeMapper } from '../mappers/prisma-user-type-mapper';
@Injectable()
export class PrismaUserRepositories implements UserRepository {
  constructor(private prismaService: PrismaService) {}

  async create(user: User): Promise<string> {
    const userPrisma = PrismaUserMapper.toPrisma(user);

    const userCreated = await this.prismaService.user.create({
      data: userPrisma,
      select: {
        id: true,
      },
    });

    return userCreated.id;
  }

  async listAll(): Promise<User[]> {
    const users = await this.prismaService.user.findMany();
    return users.map(PrismaUserMapper.toDomain);
  }

  async listAllTeachers(): Promise<User[]> {
    const users = await this.prismaService.user.findMany({
      where: {
        userType: {
          type: 'Doscente',
        },
      },
    });
    return users.map(PrismaUserMapper.toDomain);
  }

  async findUserTypeById(typeId: string): Promise<UserType> {
    const user = await this.prismaService.userType
      .findUniqueOrThrow({
        where: {
          id: typeId,
        },
      })
      .catch(() => {
        throw new HttpException(
          'Não foi possível encontrar um tipo',
          HttpStatus.NOT_FOUND,
        );
      });

    return PrismaUserTypeMapper.toDomain(user);
  }

  async findById(userId: string): Promise<User> {
    const user = await this.prismaService.user
      .findUniqueOrThrow({
        where: {
          id: userId,
        },
      })
      .catch(() => {
        throw new HttpException(
          'Não foi possível encontrar um usuário com esse id',
          HttpStatus.NOT_FOUND,
        );
      });
    return PrismaUserMapper.toDomain(user);
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.prismaService.user.findFirst({
      where: {
        email: email,
      },
    });

    if (!user) {
      return null;
    }

    return PrismaUserMapper.toDomain(user);
  }

  async findByCode(code: string): Promise<User> {
    const user = await this.prismaService.user.findFirst({
      where: {
        code: code,
      },
    });

    if (!user) {
      return null;
    }

    return PrismaUserMapper.toDomain(user);
  }

  async update(
    userId: string,
    name: string,
    email: string,
    code: string,
    userTypeId: string,
  ): Promise<void> {
    await this.prismaService.user.update({
      where: {
        id: userId,
      },
      data: {
        name,
        email,
        code,
        userTypeId,
      },
    });
  }

  async delete(userId: string): Promise<void> {
    await this.prismaService.user.delete({
      where: {
        id: userId,
      },
    });
  }

  async updatePassword(userId: string, newPassword: string): Promise<void> {
    await this.prismaService.user.update({
      where: {
        id: userId,
      },
      data: {
        password: newPassword,
        updatedAt: getBrasiliaTime(),
      },
    });
  }
}
