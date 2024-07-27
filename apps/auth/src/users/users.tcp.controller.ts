import { Controller, UsePipes, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { MessagePattern } from '@nestjs/microservices';
import { AuthServiceEvents } from '@app/common';
import { UpdateLogoDto } from './dto/update-logo.dto';
import { OrganizationUsersDto } from './dto/organization-users.dto';
import { OrganizationUserDto } from './dto/organization-user.dto';

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

  @UsePipes(new ValidationPipe())
  @MessagePattern(AuthServiceEvents.FIND_USERS_BY_ORGANIZATION)
  async findUsersByOrganization({ organizationId }: OrganizationUsersDto) {
    return await this.service.findAllByOrganizationId(organizationId);
  }

  @UsePipes(new ValidationPipe())
  @MessagePattern(AuthServiceEvents.FIND_USER_BY_ORGANIZATION)
  async findUserByOrganization({
    organizationId,
    userId,
  }: OrganizationUserDto) {
    const user = await this.service.findOne(userId);

    if (!user) {
      return {
        message: 'User not found',
      };
    }

    return await this.service.findOneByOrganizationId(organizationId, userId);
  }

  @UsePipes(new ValidationPipe())
  @MessagePattern(AuthServiceEvents.ADD_USER_TO_ORGANIZATION)
  async addToOrganization({ organizationId, userId }: OrganizationUserDto) {
    const user = await this.service.findOne(userId);

    if (!user) {
      return {
        message: 'User not found',
      };
    }

    return await this.service.update(userId, { organizationId });
  }

  @UsePipes(new ValidationPipe())
  @MessagePattern(AuthServiceEvents.REMOVE_USER_FROM_ORGANIZATION)
  async deleteToOrganization({ userId }: Pick<OrganizationUserDto, 'userId'>) {
    const user = await this.service.findOne(userId);

    if (!user) {
      return {
        message: 'User not found',
      };
    }

    return await this.service.update(userId, { organizationId: null });
  }
}
