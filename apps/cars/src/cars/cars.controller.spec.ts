import { Test, TestingModule } from '@nestjs/testing';
import { CarsController } from './cars.controller';
import { CarsService } from './cars.service';
import { PrismaModule } from '../prisma/prisma.module';
import { UsersModule } from '../users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule } from '@nestjs/microservices';
import { AUTH_SERVICE } from '@app/common';
import { UsersService } from '../users/users.service';
import { OrganizationCarsService } from './organization-cars.service';

describe('CarsController', () => {
  let carsController: CarsController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        PrismaModule,
        UsersModule,
        ClientsModule.registerAsync([
          {
            name: AUTH_SERVICE,
            useFactory: (configService: ConfigService) => ({
              transport: 1,
              options: {
                host: configService.get('AUTH_HOST'),
                port: configService.get('AUTH_PORT'),
              },
            }),
            inject: [ConfigService],
          },
        ]),
        ConfigModule.forRoot({ isGlobal: true }),
      ],
      controllers: [CarsController],
      providers: [CarsService, UsersService, OrganizationCarsService],
    }).compile();

    carsController = app.get<CarsController>(CarsController);
  });

  describe('root', () => {
    it('Find many should be defined', () => {
      expect(carsController.findMany).toBeDefined();
    });

    it('Find one should be defined', () => {
      expect(carsController.findOne).toBeDefined();
    });

    it('Find one by owner should be defined', () => {
      expect(carsController.findOneByOwner).toBeDefined();
    });

    it('Crceate one should be defined', () => {
      expect(carsController.createOne).toBeDefined();
    });

    it('Update one should be defined', () => {
      expect(carsController.updateOne).toBeDefined();
    });

    it('Delete one should be defined', () => {
      expect(carsController.deleteOne).toBeDefined();
    });
  });
});
