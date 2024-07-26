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

  async create(data: CreateUserDto): Promise<User> {
    const password = await this.hashService.hash(data.password);
    return this.prismaService.user.create({ data: { ...data, password } });
  }

  async update(id: string, data: Partial<User>): Promise<User> {
    if (data.password) {
      data.password = await this.hashService.hash(data.password);
    }

    const result = await this.prismaService.user.update({
      where: { id },
      data,
    });

    return result;
  }

  async remove(id: string): Promise<User> {
    return this.prismaService.user.delete({ where: { id } });
  }

  async findAll(query: PaginationQuery): Promise<User[]> {
    const { take = 10, skip = 0 } = query;

    const result = await this.prismaService.user.findMany({
      orderBy: { id: 'desc' },
      take: Number(take),
      skip: Number(skip),
    });
    return result;
  }

  async findAllByOrganizationId(
    organizationId: string,
    take = 10,
    skip = 0,
  ): Promise<User[]> {
    return await this.prismaService.user.findMany({
      where: { organizationId },
      orderBy: { id: 'desc' },
      take,
      skip,
    });
  }

  async findOneByOrganizationId(
    organizationId: string,
    userId: string,
  ): Promise<User> {
    return await this.prismaService.user.findFirst({
      where: { organizationId, id: userId },
    });
  }

  async findOne(id: string): Promise<User> {
    return await this.prismaService.user.findFirst({ where: { id } });
  }

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

  async getUser({ id }: GetUserDto) {
    return await this.prismaService.user.findFirstOrThrow({
      where: { id: id },
    });
  }

  async findByEmail(email: string): Promise<User> {
    return await this.prismaService.user.findUnique({ where: { email } });
  }
}
