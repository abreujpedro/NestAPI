import { Inject, Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

import { CarEntity } from 'src/car/domain/entity/car-entity';
import { SendMailService } from 'src/mail/application/send-email.service';

@Injectable()
export class CarListener {
  constructor(
    @Inject(SendMailService) private readonly sendMailService: SendMailService,
  ) {}

  @OnEvent('car.created')
  async handleUserCreatedEvent(car: CarEntity) {
    await this.sendMailService.execute({
      content: `Car created ${car.getModelName()}`,
      subject: 'Car created',
      user: 'example@example',
    });
  }
}
