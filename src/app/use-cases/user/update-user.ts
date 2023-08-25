import { UserRepository } from '@app/repositories/user-repository';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

interface UpdateUserRequest {
  userId: string;
  email: string;
  name: string;
  code: string;
  userTypeId: string;
}

@Injectable()
export class UpdateUser {
  constructor(private userRepository: UserRepository) {}

  async execute(request: UpdateUserRequest): Promise<void> {
    const { userId, name, email, code, userTypeId } = request;

    const user = this.userRepository.findById(userId);

    if (!user) {
      throw new HttpException(
        'O usuário informado não existe',
        HttpStatus.NOT_FOUND,
      );
    }

    await this.userRepository.update(userId, name, email, code, userTypeId);
  }
}
