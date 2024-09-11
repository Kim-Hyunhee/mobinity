import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { SignUpUserDTO } from '../user/dto/sign-up.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private userService: UserService) {}

  @Post('/sign-up')
  @ApiOperation({ summary: '회원 가입' })
  async postSignUp(@Body() body: SignUpUserDTO) {
    return await this.userService.createUser(body);
  }
}
