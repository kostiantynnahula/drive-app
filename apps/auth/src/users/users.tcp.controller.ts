import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';
import { MessagePattern } from '@nestjs/microservices';
import { AuthServiceEvents } from '@app/common';
import { UpdateLogoDto } from './dto/update-logo.dto';

@Controller()
export class UsersTcpController {
  constructor(private readonly service: UsersService) {}

  @MessagePattern(AuthServiceEvents.UPDATE_USER_LOGO)
  async updateUserLogo({ userId, logo }: UpdateLogoDto) {
    const user = await this.service.findOne(userId);

    if (!user) {
      return {
        message: 'User not found',
      };
    }

    return await this.service.update(userId, { logo });
  }

  @MessagePattern(AuthServiceEvents.FIND_USER_BY_ID)
  async findOne(id: string) {
    const user = await this.service.findOne(id);

    if (!user) {
      return {
        message: 'User not found',
      };
    }

    return user;
  }
}
