import { ConfigService } from '@nestjs/config';

export const jwtConfigFactory = (configService: ConfigService) => {
  return {
    secret: configService.get<string>('JWT_SECRET'),
    signOptions: {
      expiresIn: `${configService.get('JWT_EXPIRATION')}s`,
    },
  };
};
