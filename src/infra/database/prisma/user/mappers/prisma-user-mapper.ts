import { User } from '@app/entities/user';
import { User as RawUser } from '@prisma/client';

export class PrismaUserMapper {
  static toPrisma(user: User) {
    return {
      email: user.email,
      name: user.name,
      password: user.password,
      code: user.code,
      userTypeId: user.userTypeId,
    };
  }

  static toDomain(raw: RawUser): User {
    return new User({
      id: raw.id,
      name: raw.name,
      email: raw.email,
      password: raw.password,
      code: raw.code,
      userTypeId: raw.userTypeId,
      createdAt: raw.createdAt,
      updateAt: raw.updatedAt,
    });
  }
}
