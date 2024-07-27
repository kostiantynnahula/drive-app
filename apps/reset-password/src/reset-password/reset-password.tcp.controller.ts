import { Controller } from '@nestjs/common';
import { ResetPasswordService } from './reset-password.service';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { ResetPasswordEvent } from '@app/common';
import { EmailDto } from './dto/email.dto';
import { TokenDto } from './dto/token.dto';

@Controller()
export class ResetPasswordTcpController {
  constructor(private readonly service: ResetPasswordService) {}

  @EventPattern(ResetPasswordEvent.FORGOT_PASSWORD)
  async forgotPassword({ email }: EmailDto) {
    const exist = await this.service.findResetByEmail(email);

    if (exist) {
      await this.service.invalidateToken(exist.token, email);
    }

    return await this.service.createReset(email);
  }

  @MessagePattern(ResetPasswordEvent.FIND_TOKEN_DETAILS)
  async findTokenDetails({ token }: TokenDto) {
    return await this.service.findTokenDetails(token);
  }

  @MessagePattern(ResetPasswordEvent.VERIFY_TOKEN)
  async verifyToken({ token }: TokenDto) {
    const reset = await this.service.findResetByToken(token);

    return reset ? true : false;
  }

  @MessagePattern(ResetPasswordEvent.INVALIDATE_TOKEN)
  async invalidateToken({ email, token }: EmailDto & TokenDto) {
    const result = await this.service.invalidateToken(token, email);

    return result ? true : false;
  }
}
