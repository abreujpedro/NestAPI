import { Controller, Get } from '@nestjs/common';

import { ApiExcludeEndpoint } from '@nestjs/swagger';

@Controller()
export class HealthCheckerController {
  constructor() {}

  @ApiExcludeEndpoint()
  @Get()
  getHealthChecker(): string {
    return 'ok';
  }
}
