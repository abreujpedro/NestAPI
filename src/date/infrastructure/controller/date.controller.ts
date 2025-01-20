import {
  Controller,
  Get,
  HttpStatus,
  Inject,
  Query,
  Res,
} from '@nestjs/common';
import { Response } from 'express';

import { GetDateService } from 'src/date/application/get-date.service';
import {
  GetDateErrorEnum,
  GetDateResponses,
} from 'src/date/domain/interfaces/get-date-interfaces';
import { createResponseObj } from 'src/common/domain/utils/response-factory';
import { GetDateRequest } from 'src/date/infrastructure/controller/request/get-date-request.dto';
import { LogManager } from 'src/common/domain/services/logger-service';
import { ApiOperation } from '@nestjs/swagger';

@Controller('/date')
export class DateController {
  constructor(
    @Inject(GetDateService) private readonly getDateService: GetDateService,
    @Inject(LogManager) private readonly logManager: LogManager,
  ) {
    this.logManager.setContext(this.constructor.name);
  }

  @Get('/server-time')
  @ApiOperation({
    summary: 'Get the server date/time',
    description: 'This route returns the time from server',
  })
  async getDate(
    @Res() res: Response,
    @Query() queries: GetDateRequest,
  ): Promise<void> {
    this.logManager.log('Starting to get date request', queries);

    this.getDateService.onSuccess = this.onSuccess(res);

    this.getDateService.onError = this.onError(res);

    return this.getDateService.getDate();
  }

  private onSuccess(
    res: Response,
  ): (objResponse: GetDateResponses.SuccessResponse) => Promise<void> {
    return async (objResponse) => {
      const responseData = createResponseObj<
        GetDateResponses.SuccessResponse,
        GetDateErrorEnum
      >({
        data: objResponse,
      });
      this.logManager.log('Success to get date', responseData);

      res.status(HttpStatus.OK).send(responseData);
    };
  }

  private onError(
    res: Response,
  ): (objResponse: GetDateResponses.ErrorResponse) => Promise<void> {
    return async (objResponse) => {
      const responseData = createResponseObj<
        GetDateResponses.ErrorResponse,
        GetDateErrorEnum
      >({
        data: objResponse,
        errorEnum: GetDateErrorEnum.ERROR_RESPONSE,
        errors: 'An internal server error occurred',
      });
      this.logManager.log('Error to get date', responseData);

      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(responseData);
    };
  }
}
