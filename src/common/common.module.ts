import { Module } from '@nestjs/common';

import { LogManager } from 'src/common/domain/services/logger-service';
import { DatabaseConnection } from 'src/common/infrastructure/database/prisma/database-connection';
import { IdentifyRequestLogger } from 'src/common/infrastructure/services/identify-request-logger';
import { NestLogManager } from 'src/common/infrastructure/services/nest-logger-service';

@Module({
  providers: [
    { provide: LogManager, useClass: NestLogManager },
    IdentifyRequestLogger,
    DatabaseConnection,
  ],
  exports: [LogManager, DatabaseConnection],
})
export class CommonModule {}
