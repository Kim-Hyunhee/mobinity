import { BadRequestException, Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private repository: UserRepository) {}

  async createUser({
    userName,
    password,
  }: {
    userName: string;
    password: string;
  }) {
    const user = await this.repository.findUser({ where: { userName } });
    if (user) {
      throw new BadRequestException('이미 존재하는 아이디입니다.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await this.repository.insertUser({
      userName,
      password: hashedPassword,
    });

    return true;
  }
}
