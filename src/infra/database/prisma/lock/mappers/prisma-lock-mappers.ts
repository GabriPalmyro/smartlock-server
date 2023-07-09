import { Lock } from '@app/entities/Lock';
import { Lock as RawLock } from '@prisma/client';

export class PrismaLockMapper {
  static toDomain(raw: RawLock): Lock {
    return new Lock({
      id: raw.id,
      name: raw.name,
      state: raw.state,
    });
  }
}
