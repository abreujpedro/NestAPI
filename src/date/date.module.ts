import { Module } from '@nestjs/common';
import { CommonModule } from 'src/common/common.module';

import { GetDateService } from 'src/date/application/get-date.service';
import { DateController } from 'src/date/infrastructure/controller/date.controller';

@Module({
  imports: [CommonModule],
  controllers: [DateController],
  providers: [GetDateService],
})
export class DateModule {}
