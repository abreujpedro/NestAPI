import { Inject, Injectable } from '@nestjs/common';
import { LogManager } from 'src/common/domain/services/logger-service';

import { noop } from 'src/common/domain/utils/noop';
import { GetDateResponses } from 'src/date/domain/interfaces/get-date-interfaces';

@Injectable()
export class GetDateService {
  constructor(@Inject(LogManager) private readonly logManager: LogManager) {
    this.logManager.setContext(this.constructor.name);
  }

  public onSuccess: (
    response: GetDateResponses.SuccessResponse,
  ) => Promise<any> = noop;

  public onError: (response: GetDateResponses.ErrorResponse) => Promise<any> =
    noop;

  getDate(): Promise<void> {
    try {
      this.logManager.log('Starting command');

      const now = new Date();

      this.logManager.log('Success to run command', { data: now });

      return this.onSuccess({ date: now });
    } catch (error: unknown) {
      this.logManager.error('Error to run command', { error });

      return this.onError();
    }
  }
}
