import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUserDto } from './dto/get-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '.prisma/client';
import { HashService } from '../utils/services/hash.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly hashService: HashService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const password = await this.hashService.hash(createUserDto.password);

    return this.prismaService.user.create({
      data: {
        ...createUserDto,
        password: password,
      },
    });
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
    return this.prismaService.user.findFirstOrThrow({ where: { id: +id } });
  }

  async findByEmail(email: string): Promise<User> {
    return this.prismaService.user.findFirst({ where: { email } });
  }
}
