import { AUTH_SERVICE, AuthServiceEvents, User } from '@app/common';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class UsersService {
  constructor(
    @Inject(AUTH_SERVICE)
    private readonly authServiceClient: ClientProxy,
  ) {}

  /**
   * Find all users related to organization
   *
   * @param {string} organizationId
   * @returns {Promise<User[]>}
   */
  async findAll(organizationId: string): Promise<User> {
    const message = await this.authServiceClient.send(
      AuthServiceEvents.FIND_USERS_BY_ORGANIZATION,
      { organizationId },
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
    const message = this.authServiceClient.send(
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
    organizationId: string,
  ): Promise<User> {
    const message = await this.authServiceClient.send(
      AuthServiceEvents.ADD_USER_TO_ORGANIZATION,
      { userId, organizationId },
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
    organizationId: string,
  ): Promise<User> {
    const message = this.authServiceClient.send(
      AuthServiceEvents.REMOVE_USER_FROM_ORGANIZATION,
      { userId, organizationId },
    );

    return await firstValueFrom(message);
  }
}
