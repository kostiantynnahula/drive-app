import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from '../utils/dto/create-user.dto';
import { GetUserDto } from './dto/get-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '.prisma/client';
import { HashService } from '../utils/services/hash.service';
import { PaginationQuery } from '@app/common';

@Injectable()
export class UsersService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly hashService: HashService,
  ) {}

  /**
   * Create a new user
   *
   * @param {CreateUserDto} data
   * @returns {Promise<User>}
   */
  async createOne(data: CreateUserDto): Promise<User> {
    const password = await this.hashService.hash(data.password);
    return this.prismaService.user.create({ data: { ...data, password } });
  }

  /**
   * Update a user
   *
   * @param {string} id
   * @param {Partial<User>} data
   * @returns {Promise<User>}
   */
  async updateOne(id: string, data: Partial<User>): Promise<User> {
    if (data.password) {
      data.password = await this.hashService.hash(data.password);
    }

    const result = await this.prismaService.user.update({
      where: { id },
      data,
    });

    return result;
  }

  /**
   * Delete a user
   *
   * @param {string} id
   * @returns {Promise<User>}
   */
  async deleteOne(id: string): Promise<User> {
    return this.prismaService.user.delete({ where: { id } });
  }

  /**
   * Find all users
   *
   * @param {PaginationQuery} query
   * @returns {Promise<User[]>}
   */
  async findMany(query: PaginationQuery): Promise<User[]> {
    const { take = 10, skip = 0 } = query;

    const result = await this.prismaService.user.findMany({
      orderBy: { id: 'desc' },
      take: Number(take),
      skip: Number(skip),
    });
    return result;
  }

  /**
   * Find one user
   *
   * @param {string} id
   * @returns {Promise<User>}
   */
  async findOne(id: string): Promise<User> {
    return await this.prismaService.user.findFirst({ where: { id } });
  }

  /**
   * Verify user credentials
   *
   * @param {string} email
   * @param {string} password
   * @returns {Promise<User>}
   */
  async verifyUser(email: string, password: string) {
    const user = await this.prismaService.user.findFirstOrThrow({
      where: { email },
    });

    const passwordIsValid = await this.hashService.compare(
      password,
      user.password,
    );

    if (!passwordIsValid) {
      throw new UnauthorizedException('Credentials are not valid.');
    }
    return user;
  }

  /**
   * Get user by id
   *
   * @param {GetUserDto} param
   * @returns {Promise<User>}
   */
  async getUser({ id }: GetUserDto) {
    return await this.prismaService.user.findFirstOrThrow({
      where: { id: id },
    });
  }

  /**
   * Find user by email
   *
   * @param {string} email
   * @returns {Promise<User>}
   */
  async findByEmail(email: string): Promise<User> {
    return await this.prismaService.user.findUnique({ where: { email } });
  }

  /**
   * Find user by email or phone
   *
   * @param {string} email
   * @param {string} phone
   * @returns {Promise<User>}
   */
  async findByEmailOrPhone(email: string, phone: string): Promise<User> {
    return await this.prismaService.user.findFirst({
      where: {
        OR: [{ email }, { phone }],
      },
    });
  }
}
