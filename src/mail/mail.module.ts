import { Module } from '@nestjs/common';

import { CommonModule } from 'src/common/common.module';
import { SendMailService } from 'src/mail/application/send-email.service';

@Module({
  imports: [CommonModule],
  providers: [SendMailService],
  exports: [SendMailService],
})
export class MailModule {}
