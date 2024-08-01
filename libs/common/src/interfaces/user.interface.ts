export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  gender: Gender;
  password: string;
  role: Role;
  logo: string;
  organizationId: string;
  locationId: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
}

export enum Role {
  USER = 'USER',
  INSTRUCTOR = 'INSTRUCTOR',
  ADMIN = 'ADMIN',
  SUPERADMIN = 'SUPERADMIN',
}
