import { User } from '@app/entities/user';
import { UserRepository } from '@app/repositories/user/user-repository';
import { Injectable } from '@nestjs/common';
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

  findById(userId: number): Promise<User> {
    throw new Error('Method not implemented.');
  }
  findByEmail(email: string): Promise<User> {
    throw new Error('Method not implemented.');
  }
  update(userId: number, name: string, nickname: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  updateHashRT(userId: number, hash: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  deleteHashRT(userId: number): Promise<void> {
    throw new Error('Method not implemented.');
  }
  updateVerifiedAt(userId: number): Promise<void> {
    throw new Error('Method not implemented.');
  }
  delete(user: User): Promise<void> {
    throw new Error('Method not implemented.');
  }
  updatePassword(
    userId: number,
    password: string,
    newPassword: string,
  ): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
