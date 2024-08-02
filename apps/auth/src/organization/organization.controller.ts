import {
  BadRequestException,
  Controller,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { OrganizationService } from './organization.service';
import { MessagePattern } from '@nestjs/microservices';
import { AuthServiceEvents } from '@app/common';
import { OrganizationDto } from './dto/organization.dto';
import { OrganizationUserDto } from './dto/organization-user.dto';
import { OrganizationUserAssignDto } from './dto/organization-user-assign.dto';
import { NotificationsService } from '../notifications/notifications.service';
import { UsersService } from '../users/users.service';
import { OrganizationCreateUserDto } from './dto/organization-create-user.dto';

@Controller()
export class OrganizationController {
  constructor(
    private readonly service: OrganizationService,
    private readonly userService: UsersService,
    private readonly notificationsService: NotificationsService,
  ) {}

  @UsePipes(new ValidationPipe())
  @MessagePattern(AuthServiceEvents.CREATE_USER_TO_ORGANIZATION)
  async creatOne(payload: OrganizationCreateUserDto) {
    const { email, phone } = payload;

    const user = await this.userService.findByEmailOrPhone(email, phone);

    if (user) {
      throw new BadRequestException('User exists');
    }

    return await this.userService.createOne(payload);
  }

  @UsePipes(new ValidationPipe())
  @MessagePattern(AuthServiceEvents.FIND_USERS_BY_ORGANIZATION)
  async findMany(payload: OrganizationDto) {
    return await this.service.findMany(payload);
  }

  @UsePipes(new ValidationPipe())
  @MessagePattern(AuthServiceEvents.FIND_USER_BY_ORGANIZATION)
  async findOne({ userId, organizationId }: OrganizationUserDto) {
    return await this.service.findOne(userId, organizationId);
  }

  @UsePipes(new ValidationPipe())
  @MessagePattern(AuthServiceEvents.ADD_USER_TO_ORGANIZATION)
  async addToOrganization({
    userId,
    locationId,
    organizationId,
    organizationEmail,
    organizationName,
  }: OrganizationUserAssignDto) {
    const user = await this.service.findOne(userId, organizationId);

    if (!user) {
      throw new BadRequestException('User not found');
    }

    const result = await this.service.addToOrganization(
      userId,
      locationId,
      organizationId,
    );

    await this.notificationsService.addToOrganization(
      organizationEmail,
      user.email,
      organizationName,
    );

    return result;
  }

  @MessagePattern(AuthServiceEvents.REMOVE_USER_FROM_ORGANIZATION)
  async removeFromOrganization({
    userId,
    organizationId,
    organizationEmail,
    organizationName,
  }: OrganizationUserAssignDto) {
    const user = await this.service.findOne(userId, organizationId);

    if (!user) {
      throw new BadRequestException('User not found');
    }

    const result = await this.service.removeFromOrganization(
      userId,
      organizationId,
    );

    await this.notificationsService.removeFromOrganization(
      organizationEmail,
      user.email,
      organizationName,
    );

    return result;
  }
}
