import {
  AUTH_SERVICE,
  AuthServiceEvents,
  Organization,
  User,
} from '@app/common';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { UsersQuery } from './dto/users.query';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @Inject(AUTH_SERVICE)
    private readonly authServiceClient: ClientProxy,
  ) {}

  async createOne(organizationId: string, payload: CreateUserDto) {
    try {
      const message = await this.authServiceClient.send(
        AuthServiceEvents.CREATE_USER_TO_ORGANIZATION,
        { organizationId, ...payload },
      );

      return await firstValueFrom(message);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  /**
   * Find all users related to organization
   *
   * @param {string} organizationId
   * @returns {Promise<User[]>}
   */
  async findMany(organizationId: string, query: UsersQuery): Promise<User[]> {
    const message = await this.authServiceClient.send(
      AuthServiceEvents.FIND_USERS_BY_ORGANIZATION,
      {
        organizationId,
        ...query,
      },
    );

    return await firstValueFrom(message);
  }

  /**
   * Find user by id related to organization
   * @param {string} userId
   * @param {string} organizationId
   * @returns {Promise<User>}
   */
  async findOne(userId: string, organizationId: string): Promise<User> {
    const message = await this.authServiceClient.send(
      AuthServiceEvents.FIND_USER_BY_ORGANIZATION,
      { userId, organizationId },
    );

    return await firstValueFrom(message);
  }

  /**
   * Add user to organization
   *
   * @param {string} userId
   * @param {string} organizationId
   * @returns {Promise<User>}
   */
  async addUserToOrganization(
    userId: string,
    locationId: string,
    {
      id: organizationId,
      email: organizationEmail,
      name: organizationName,
    }: Organization,
  ): Promise<User> {
    const message = await this.authServiceClient.send(
      AuthServiceEvents.ADD_USER_TO_ORGANIZATION,
      {
        userId,
        locationId,
        organizationId,
        organizationEmail,
        organizationName,
      },
    );

    return await firstValueFrom(message);
  }

  /**
   * Delete user from organization
   *
   * @param {string} userId
   * @param {string} organizationId
   * @returns {Promise<User>}
   */
  async removeUserFromOrganization(
    userId: string,
    organization: Organization,
  ): Promise<User> {
    const message = this.authServiceClient.send(
      AuthServiceEvents.REMOVE_USER_FROM_ORGANIZATION,
      { userId, organization },
    );

    return await firstValueFrom(message);
  }
}
