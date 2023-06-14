import { UserRepository } from '@app/repositories/user/user-repository';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from 'src/app/entities/user';

interface LoginWithEmailAndPasswordRequest {
  email: string;
  password: string;
}

interface LoginWithEmailAndPasswordResponse {
  user: User;
}

@Injectable()
export class LoginWithEmailAndPassword {
  constructor(private userRepository: UserRepository) {}

  async execute(
    request: LoginWithEmailAndPasswordRequest,
  ): Promise<LoginWithEmailAndPasswordResponse> {
    const { email, password } = request;

    const user = await this.userRepository.findByEmail(email);

    if (!user)
      throw new HttpException(
        'Nenhum conta com essa credencial encontrada',
        HttpStatus.BAD_REQUEST,
      );

    const passwordMatches = await bcrypt.compare(password, user.password);

    if (!passwordMatches)
      throw new HttpException(
        'Verifique seu e-mail ou senha novamente',
        HttpStatus.BAD_REQUEST,
      );

    return { user };
  }
}
