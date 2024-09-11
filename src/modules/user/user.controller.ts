import { Body, Controller, Put, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from 'src/decorators/user.decorator';
import { UpdateUserDTO } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('users')
@Controller('users')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private userService: UserService) {}

  @Put()
  @ApiOperation({ summary: '내 정보 수정' })
  async getOrder(
    @User('id') userId: number,
    @Body() { setAmount }: UpdateUserDTO,
  ) {
    return await this.userService.modifyUser({ userId, setAmount });
  }
}
