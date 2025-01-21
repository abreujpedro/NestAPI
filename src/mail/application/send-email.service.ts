import { Inject, Injectable } from '@nestjs/common';

import { LogManager } from 'src/common/domain/services/logger-service';

@Injectable()
export class SendMailService {
  constructor(@Inject(LogManager) private readonly logManager: LogManager) {
    this.logManager.setContext(this.constructor.name);
  }

  async execute(mail: {
    user: string;
    subject: string;
    content: string;
  }): Promise<void> {
    try {
      this.logManager.log('Mock send email', { mail });
    } catch (error: unknown) {
      this.logManager.error('Error to run command', {
        mail,
        error,
      });
      throw new Error('Error to run command');
    }
  }
}
