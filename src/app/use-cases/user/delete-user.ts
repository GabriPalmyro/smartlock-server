import { UserRepository } from '@app/repositories/user-repository';
import { Injectable } from '@nestjs/common';

interface DeleteByIdRequest {
  userId: string;
}

@Injectable()
export class DeleteById {
  constructor(private userRepository: UserRepository) {}

  async execute(request: DeleteByIdRequest): Promise<void> {
    const { userId } = request;

    await this.userRepository.delete(userId);

    return;
  }
}
