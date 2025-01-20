import { Module } from '@nestjs/common';
import { CarModule } from 'src/car/car.module';

import { CommonModule } from 'src/common/common.module';
import { HealthCheckerController } from 'src/common/infrastructure/health-checker/health-checker.controller';

@Module({
  imports: [CarModule, CommonModule],
  controllers: [HealthCheckerController],
})
export class AppModule {}
