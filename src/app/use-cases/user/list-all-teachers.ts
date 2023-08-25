import { User } from '@app/entities/user';
import { UserRepository } from '@app/repositories/user-repository';
import { Injectable } from '@nestjs/common';

interface ListAllTeachersUsersResponse {
  users: User[];
}

@Injectable()
export class ListAllTeachers {
  constructor(private userRepository: UserRepository) {}

  async execute(): Promise<ListAllTeachersUsersResponse> {
    const users = await this.userRepository.listAllTeachers();

    return { users };
  }
}
