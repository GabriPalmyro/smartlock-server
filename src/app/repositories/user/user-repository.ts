import { User } from '@app/entities/user';

export abstract class UserRepository {
  abstract create(user: User): Promise<number>;
  abstract listAll(): Promise<User[]> | null;
  abstract findById(userId: number): Promise<User> | null;
  abstract findByEmail(email: string): Promise<User> | null;
  abstract update(
    userId: number,
    name: string,
    nickname: string,
  ): Promise<void>;
  abstract updateHashRT(userId: number, hash: string): Promise<void>;
  abstract deleteHashRT(userId: number): Promise<void>;
  abstract updateVerifiedAt(userId: number): Promise<void>;
  abstract delete(user: User): Promise<void>;
  abstract updatePassword(
    userId: number,
    password: string,
    newPassword: string,
  ): Promise<void>;
}
