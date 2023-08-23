import { User } from '@app/entities/user';
import { UserRepository } from '@app/repositories/user-repository';
import { Injectable } from '@nestjs/common';

interface ListAllUsersResponse {
  users: User[];
}

@Injectable()
export class ListAllUsers {
  constructor(private userRepository: UserRepository) {}

  async execute(): Promise<ListAllUsersResponse> {
    const users = await this.userRepository.listAll();

    return { users };
  }
}
