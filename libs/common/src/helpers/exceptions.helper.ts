import { Role, User } from '@app/common';
import { BadRequestException } from '@nestjs/common';

/**
 * Check does user relate to organization
 *
 * @param {User} user
 * @param {string} organizationId
 */
export const checkUserOrganization = (user: User, organizationId: string) => {
  if (user?.organizationId !== organizationId) {
    throw new BadRequestException("User doen't relate to the organization");
  }
};

/**
 * Check does user has relation to organization
 *
 * @param {User} user
 * @param {Boolean} has
 */
export const hasUserOrganization = (user: User, has = true) => {
  if (!user.organizationId && has) {
    throw new BadRequestException("User doen't belong to any organization");
  }

  if (user.organizationId && !has) {
    throw new BadRequestException('User has already belonged to organization');
  }
};

/**
 * Check does user have a role
 * @param {User} user
 * @param {Role} role
 */
export const hasUserRole = (user: User, role: Role) => {
  if (user.role !== role) {
    throw new BadRequestException(`User is not an ${role.toLowerCase()}`);
  }
};
