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
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

enum Gender {
  MALE,
  FEMALE,
}

enum Role {
  USER,
  INSTRUCTOR,
  ADMIN,
  SUPERADMIN,
}
