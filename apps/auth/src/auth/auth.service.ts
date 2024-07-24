import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { TokenPayload } from '../utils/interfaces/token-payload.interface';
import { User } from '.prisma/client';
import { HashService } from '../utils/services/hash.service';
import { CreateUserDto } from './../utils/dto/create-user.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly hashService: HashService,
    private readonly prismaService: PrismaService,
  ) {}

  /**
   * Login user
   *
   * @param {User} user
   * @param {Response} response
   */
  async login(user: User, response: Response) {
    const tokenPayload: TokenPayload = {
      userId: user.id,
    };

    const expires = new Date();

    expires.setSeconds(
      expires.getSeconds() + this.configService.get('JWT_EXPIRATION'),
    );

    const token = this.jwtService.sign(tokenPayload);

    response.cookie('Authentication', token, {
      httpOnly: true,
      expires,
    });
  }

  /**
   * Register a new user
   *
   * @param {CreateUserDto} data
   * @returns {Promise<User>}
   */
  async register(data: CreateUserDto): Promise<User> {
    const password = await this.hashService.hash(data.password);

    const result = await this.prismaService.user.create({
      data: {
        ...data,
        password,
      },
    });

    return result;
  }
}
