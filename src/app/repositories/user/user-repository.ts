import { User } from '@app/entities/user';

export abstract class UserRepository {
  abstract create(user: User): Promise<number>;
  abstract listAll(): Promise<User[]> | null;
  abstract findById(userId: number): Promise<User> | null;
  abstract findByEmail(email: string): Promise<User> | null;
  abstract findByCode(code: string): Promise<User> | null;
  abstract update(
    userId: number,
    name: string,
    nickname: string,
  ): Promise<void>;
  abstract delete(userId: number): Promise<void>;
  abstract updatePassword(userId: number, newPassword: string): Promise<void>;
}
