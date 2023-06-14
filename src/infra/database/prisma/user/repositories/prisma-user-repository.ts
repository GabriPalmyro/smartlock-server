import { User } from '@app/entities/user';
import { UserRepository } from '@app/repositories/user/user-repository';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { PrismaUserMapper } from '../mappers/prisma-user-mapper';
@Injectable()
export class PrismaUserRepositories implements UserRepository {
  constructor(private prismaService: PrismaService) {}

  async create(user: User): Promise<number> {
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

  async findById(userId: number): Promise<User> {
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

  update(userId: number, name: string, nickname: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async delete(userId: number): Promise<void> {
    await this.prismaService.user.delete({
      where: {
        id: userId,
      },
    });
  }

  async updatePassword(userId: number, newPassword: string): Promise<void> {
    await this.prismaService.user.update({
      where: {
        id: userId,
      },
      data: {
        password: newPassword,
        updatedAt: Date(),
      },
    });
  }
}
