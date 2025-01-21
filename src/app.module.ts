import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';

import { CarModule } from 'src/car/car.module';
import { CommonModule } from 'src/common/common.module';
import { HealthCheckerController } from 'src/common/infrastructure/health-checker/health-checker.controller';

@Module({
  imports: [CarModule, CommonModule, EventEmitterModule.forRoot()],
  controllers: [HealthCheckerController],
})
export class AppModule {}
