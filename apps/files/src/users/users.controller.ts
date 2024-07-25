import { Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @Post('upload/:id/logo')
  async uploadLogo() {
    // upload logo

    return await this.service.updateUserLogo(1, 'path');
  }
}
