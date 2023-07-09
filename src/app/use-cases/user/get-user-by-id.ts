import { UserRepository } from '@app/repositories/user-repository';
import { Injectable } from '@nestjs/common';
import { User } from 'src/app/entities/user';

interface GetUserByIdRequest {
  userId: string;
}

interface GetUserByIdResponse {
  user: User;
}

@Injectable()
export class GetUserById {
  constructor(private userRepository: UserRepository) {}

  async execute(request: GetUserByIdRequest): Promise<GetUserByIdResponse> {
    const { userId } = request;

    const user = await this.userRepository.findById(userId);

    return { user };
  }
}
