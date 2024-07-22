import { Controller, Post } from '@nestjs/common';
import { NotificationsService } from './notifications.service';

@Controller()
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Post()
  create() {
    return { message: 'Notification created' };
  }
}
