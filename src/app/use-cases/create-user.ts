import { UserRepository } from '@app/repositories/user/user-repository';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from 'src/app/entities/user';

interface CreateUserRequest {
  email: string;
  name: string;
  password: string;
  teacherCode: string;
  userTypeId: number;
}

interface CreateUserResponse {
  user: User;
}

@Injectable()
export class CreateUser {
  constructor(private userRepository: UserRepository) {}

  async execute(request: CreateUserRequest): Promise<CreateUserResponse> {
    const { name, email, teacherCode, userTypeId, password } = request;

    const userExistsByEmail = await this.userRepository.findByEmail(email);

    if (userExistsByEmail) {
      throw new HttpException(
        'O e-mail informado já está sendo utilizado.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const user = new User({
      name: name,
      email: email,
      password: password,
      teacherCode: teacherCode,
      userTypeId: userTypeId,
    });

    const userId = await this.userRepository.create(user);
    user.id = userId;

    return { user };
  }
}
