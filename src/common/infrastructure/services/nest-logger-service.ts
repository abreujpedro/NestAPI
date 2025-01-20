import { Logger, Injectable, Scope, Inject } from '@nestjs/common';

import { LogManager } from 'src/common/domain/services/logger-service';
import { IdentifyRequestLogger } from 'src/common/infrastructure/services/identify-request-logger';

@Injectable({ scope: Scope.TRANSIENT })
export class NestLogManager implements LogManager {
  constructor(
    @Inject(IdentifyRequestLogger)
    private readonly identifyRequestLogger: IdentifyRequestLogger,
  ) {}
  private context = '';

  private readonly logger = new Logger(
    this.identifyRequestLogger.getContext(),
    { timestamp: true },
  );

  public setContext(context: string): void {
    this.context = context;
  }

  public log(message: any, ...optionalParams: any[]): void {
    this.logger.log({ context: this.context, message, optionalParams });
  }

  public fatal(message: any, ...optionalParams: any[]): void {
    this.logger.fatal({ context: this.context, message, optionalParams });
  }

  public error(message: any, ...optionalParams: any[]): void {
    this.logger.error({ context: this.context, message, optionalParams });
  }

  public warn(message: any, ...optionalParams: any[]): void {
    this.logger.warn({ context: this.context, message, optionalParams });
  }

  public debug?(message: any, ...optionalParams: any[]): void {
    this.logger.debug({ context: this.context, message, optionalParams });
  }

  public verbose?(message: any, ...optionalParams: any[]): void {
    this.logger.verbose({ context: this.context, message, optionalParams });
  }
}
