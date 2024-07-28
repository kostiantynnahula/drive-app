import { Controller, Logger, UsePipes, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { MessagePattern } from '@nestjs/microservices';
import { AuthServiceEvents } from '@app/common';
import { UpdateLogoDto } from './dto/update-logo.dto';
import { OrganizationUsersDto } from './dto/organization-users.dto';
import { OrganizationUserDto } from './dto/organization-user.dto';
import { NotificationsService } from '../notifications/notifications.service';
import { OrganizationAssignDto } from './dto/organization-assign.dto';

@Controller()
export class UsersTcpController {
  constructor(
    private readonly service: UsersService,
    private readonly notificationsService: NotificationsService,
  ) {}

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
  async addToOrganization({ userId, organization }: OrganizationAssignDto) {
    const user = await this.service.findOne(userId);

    Logger.log('add user');

    if (!user) {
      return {
        message: 'User not found',
      };
    }

    const result = await this.service.update(userId, {
      organizationId: organization.id,
    });

    await this.notificationsService.addToOrganization(
      organization.email,
      user.email,
      organization.name,
    );

    return result;
  }

  @UsePipes(new ValidationPipe())
  @MessagePattern(AuthServiceEvents.REMOVE_USER_FROM_ORGANIZATION)
  async deleteToOrganization({ userId, organization }: OrganizationAssignDto) {
    const user = await this.service.findOne(userId);

    if (!user) {
      return {
        message: 'User not found',
      };
    }

    const result = await this.service.update(userId, { organizationId: null });

    await this.notificationsService.removeFromOrganization(
      organization.email,
      user.email,
      organization.name,
    );

    return result;
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
