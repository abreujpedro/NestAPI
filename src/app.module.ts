import { Module } from '@nestjs/common';

import { DateModule } from 'src/date/date.module';
import { CommonModule } from 'src/common/common.module';
import { HealthCheckerController } from 'src/common/infrastructure/health-checker/health-checker.controller';

@Module({
  imports: [DateModule, CommonModule],
  controllers: [HealthCheckerController],
})
export class AppModule {}
