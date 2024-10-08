import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserRepository {
  constructor(private prisma: PrismaService) {}

  // userName 으로 해당 사용자를 DB에서 찾기
  async findUser({ where }: { where: { userName?: string; id?: number } }) {
    return await this.prisma.user.findFirst({ where });
  }

  // 사용자 테이블에 저장
  async insertUser(data: InsertUser) {
    return await this.prisma.user.create({ data });
  }

  // 사용자 테이블에서 정보 수정
  async updateUser({
    where,
    data,
  }: {
    where: { id: number };
    data: { setAmount: number };
  }) {
    return await this.prisma.user.update({ where, data });
  }
}

export type InsertUser = {
  userName: string;
  password: string;
};
