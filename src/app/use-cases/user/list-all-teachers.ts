import { Teacher } from '@app/entities/teacher';
import { UserRepository } from '@app/repositories/user-repository';
import { Injectable } from '@nestjs/common';

interface ListAllTeachersUsersResponse {
  teachers: Teacher[];
}

@Injectable()
export class ListAllTeachers {
  constructor(private userRepository: UserRepository) {}

  async execute(): Promise<ListAllTeachersUsersResponse> {
    const teachers = await this.userRepository.listAllTeachers();

    return { teachers };
  }
}
