import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  // 비밀번호 비교
  async checkUserPassword({
    user,
    password,
  }: {
    user: User;
    password: string;
  }) {
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      throw new BadRequestException('PW 오류입니다. 다시 시도해주세요.');
    }

    return isValid;
  }
}
