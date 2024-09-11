import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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

  async readUser({ userName }: { userName: string }) {
    const user = await this.repository.findUser({ where: { userName } });
    if (!user) {
      throw new NotFoundException('아이디를 찾을 수 없습니다.');
    }

    return user;
  }
}
