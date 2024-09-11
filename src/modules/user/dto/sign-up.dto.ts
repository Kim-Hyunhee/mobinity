import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class SignUpUserDTO {
  @IsString()
  @ApiProperty({
    description: '사용할 아이디',
    example: 'test',
  })
  userName: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: '비밀번호',
    example: 'test1234',
  })
  password: string;
}
