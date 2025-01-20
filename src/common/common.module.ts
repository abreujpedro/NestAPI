import { Module } from '@nestjs/common';

import { LogManager } from 'src/common/domain/services/logger-service';
import { IdentifyRequestLogger } from 'src/common/infrastructure/services/identify-request-logger';
import { NestLogManager } from 'src/common/infrastructure/services/nest-logger-service';

@Module({
  providers: [
    { provide: LogManager, useClass: NestLogManager },
    IdentifyRequestLogger,
  ],
  exports: [LogManager],
})
export class CommonModule {}
