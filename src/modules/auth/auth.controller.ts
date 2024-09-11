import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthDTO } from '../user/dto/auth.dto';
import { AuthService } from './auth.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @Post('/sign-up')
  @ApiOperation({ summary: '회원 가입' })
  async postSignUp(@Body() body: AuthDTO) {
    return await this.userService.createUser(body);
  }

  @Post('log-in')
  async logIn(@Body() body: AuthDTO) {
    const user = await this.userService.readUser({ userName: body.userName });

    await this.authService.checkUserPassword({ user, password: body.password });

    const token = await this.authService.generateToken({ userId: user.id });

    return { token };
  }
}
