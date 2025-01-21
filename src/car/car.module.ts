import { Module } from '@nestjs/common';
import { CreateCarService } from 'src/car/application/create-car.service';
import { GetCarService } from 'src/car/application/get-car.service';
import { CarRepository } from 'src/car/domain/repositories/car-repository';
import { CarController } from 'src/car/infrastructure/controller/car.controller';
import { PrismaCarRepository } from 'src/car/infrastructure/repositories/prisma-car-repository';
import { CommonModule } from 'src/common/common.module';
import { MailModule } from 'src/mail/mail.module';

@Module({
  imports: [CommonModule, MailModule],
  controllers: [CarController],
  providers: [
    GetCarService,
    CreateCarService,
    { provide: CarRepository, useClass: PrismaCarRepository },
  ],
})
export class CarModule {}
