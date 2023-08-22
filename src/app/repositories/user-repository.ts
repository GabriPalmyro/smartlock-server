import { User } from '@app/entities/user';
import { UserType } from '@app/entities/user-type';

export abstract class UserRepository {
  abstract create(user: User): Promise<string>;
  abstract listAll(): Promise<User[]> | null;
  abstract findUserTypeById(typeId: string): Promise<UserType> | null;
  abstract findById(userId: string): Promise<User> | null;
  abstract findByEmail(email: string): Promise<User> | null;
  abstract findByCode(code: string): Promise<User> | null;
  abstract update(
    userId: string,
    name: string,
    nickname: string,
  ): Promise<void>;
  abstract delete(userId: string): Promise<void>;
  abstract updatePassword(userId: string, newPassword: string): Promise<void>;
}
