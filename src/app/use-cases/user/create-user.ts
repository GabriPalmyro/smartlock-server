import { UserRepository } from '@app/repositories/user-repository';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from 'src/app/entities/user';

interface CreateUserRequest {
  email: string;
  name: string;
  password: string;
  code: string;
  userTypeId: string;
}

interface CreateUserResponse {
  user: User;
}

@Injectable()
export class CreateUser {
  constructor(private userRepository: UserRepository) {}

  async execute(request: CreateUserRequest): Promise<CreateUserResponse> {
    const { name, email, code, userTypeId, password } = request;

    const userExistsByEmail = await this.userRepository.findByEmail(email);

    if (userExistsByEmail) {
      throw new HttpException(
        'O e-mail informado já está sendo utilizado.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name: name,
      email: email,
      password: hashPassword,
      code: code,
      userTypeId: userTypeId,
    });

    const userId = await this.userRepository.create(user);
    user.id = userId;

    return { user };
  }
}
