import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';
import { EventPattern } from '@nestjs/microservices';
import { UPDATE_USER_LOGO } from '@app/common';
import { UpdateLogoDto } from './dto/update-logo.dto';

@Controller()
export class UsersEventController {
  constructor(private readonly service: UsersService) {}

  @EventPattern(UPDATE_USER_LOGO)
  async updateUserLogo({ userId, logo }: UpdateLogoDto) {
    const user = await this.service.findOne(userId);

    if (!user) {
      return {
        message: 'User not found',
      };
    }

    return await this.service.update(userId, { logo });
  }
}
