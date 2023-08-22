import { UserType } from '@app/entities/user-type';
import { UserType as RawUserType } from '@prisma/client';

export class PrismaUserTypeMapper {
  static toDomain(raw: RawUserType): UserType {
    return new UserType({
      id: raw.id,
      type: raw.type,
      createdAt: raw.createdAt,
    });
  }
}
