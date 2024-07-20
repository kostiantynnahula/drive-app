import { Inject, Injectable } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { PAYMENT_SERVICE } from '@app/common';
import { ClientProxy } from '@nestjs/microservices';
import { map } from 'rxjs';
import { PrismaService } from './prisma.service';

@Injectable()
export class ReservationsService {
  constructor(
    private readonly prismaService: PrismaService,
    @Inject(PAYMENT_SERVICE) private readonly paymentsService: ClientProxy,
  ) {}

  async create(createReservationDto: CreateReservationDto) {
    return this.paymentsService
      .send('create_charge', { data: 'test data' })
      .pipe(
        map((res) => {
          return res;
        }),
      );
    return 'This action adds a new reservation';
  }

  async findAll() {
    return `This action returns all reservations`;
  }

  async findOne(id: number) {
    return `This action returns a #${id} reservation`;
  }

  async update(id: number, updateReservationDto: UpdateReservationDto) {
    return `This action updates a #${id} reservation`;
  }

  async remove(id: number) {
    return `This action removes a #${id} reservation`;
  }
}
