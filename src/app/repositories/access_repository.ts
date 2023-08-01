import { Access } from '@app/entities/access';

export abstract class AccessRepository {
  abstract create(access: Access): Promise<string>;

  abstract listAll(): Promise<Access[]> | null;

  abstract findById(accessId: string): Promise<Access> | null;

  abstract update(access: Access): Promise<void>;

  abstract delete(accessId: string): Promise<void>;
}
