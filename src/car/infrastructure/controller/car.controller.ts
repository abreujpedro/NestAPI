import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Inject,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { Response } from 'express';

import { createResponseObj } from 'src/common/domain/utils/response-factory';
import { LogManager } from 'src/common/domain/services/logger-service';
import { ApiOperation } from '@nestjs/swagger';
import { GetCarService } from 'src/car/application/get-car.service';
import { GetCarRequest } from 'src/car/infrastructure/controller/request/get-car-request.dto';
import {
  GetCarErrorEnum,
  GetCarResponses,
} from 'src/car/domain/interfaces/get-car-interfaces';
import { CreateCarService } from 'src/car/application/create-car.service';
import {
  CreateCarErrorEnum,
  CreateCarResponses,
} from 'src/car/domain/interfaces/create-car-interfaces';
import { CreateCarRequest } from 'src/car/infrastructure/controller/request/create-car-request.dto';

@Controller('/cars')
export class CarController {
  constructor(
    @Inject(LogManager) private readonly logManager: LogManager,
    @Inject(GetCarService) private readonly getCarService: GetCarService,
    @Inject(CreateCarService)
    private readonly createCarService: CreateCarService,
  ) {
    this.logManager.setContext(this.constructor.name);
  }

  @Get()
  @ApiOperation({
    summary: 'Get the cars',
    description: 'This route returns the cars',
  })
  async getCar(
    @Res() res: Response,
    @Query() queries: GetCarRequest,
  ): Promise<void> {
    this.logManager.log('Starting to get cars request', queries);

    this.getCarService.onSuccess = this.onGetCarsSuccess(res);

    this.getCarService.onError = this.onGetCarsError(res);

    return this.getCarService.getCar(queries.model);
  }

  @Post()
  @ApiOperation({
    summary: 'Create a car',
    description: 'This route creates a car',
  })
  async createCar(
    @Res() res: Response,
    @Body() body: CreateCarRequest,
  ): Promise<void> {
    this.logManager.log('Starting to create car request', body);

    this.createCarService.onSuccess = this.onCreateCarSuccess(res);

    this.createCarService.onError = this.onCreateCarError(res);

    return this.createCarService.createCar(body.model);
  }

  private onGetCarsSuccess(
    res: Response,
  ): (objResponse: GetCarResponses.SuccessResponse) => Promise<void> {
    return async (objResponse) => {
      const responseData = createResponseObj<
        GetCarResponses.SuccessResponse,
        GetCarErrorEnum
      >({
        data: objResponse,
      });
      this.logManager.log('Success to get cars', responseData);

      res.status(HttpStatus.OK).send(responseData);
    };
  }

  private onGetCarsError(
    res: Response,
  ): (objResponse: GetCarResponses.ErrorResponse) => Promise<void> {
    return async (objResponse) => {
      const responseData = createResponseObj<
        GetCarResponses.ErrorResponse,
        GetCarErrorEnum
      >({
        data: objResponse,
        errorEnum: GetCarErrorEnum.ERROR_RESPONSE,
        errors: 'An internal server error occurred',
      });
      this.logManager.log('Error to get cars', responseData);

      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(responseData);
    };
  }
  private onCreateCarSuccess(
    res: Response,
  ): (objResponse: CreateCarResponses.SuccessResponse) => Promise<void> {
    return async (objResponse) => {
      const responseData = createResponseObj<
        CreateCarResponses.SuccessResponse,
        CreateCarErrorEnum
      >({
        data: objResponse,
      });
      this.logManager.log('Success to create car', responseData);

      res.status(HttpStatus.CREATED).send(responseData);
    };
  }

  private onCreateCarError(
    res: Response,
  ): (objResponse: CreateCarResponses.ErrorResponse) => Promise<void> {
    return async (objResponse) => {
      const responseData = createResponseObj<
        CreateCarResponses.ErrorResponse,
        CreateCarErrorEnum
      >({
        data: objResponse,
        errorEnum: CreateCarErrorEnum.ERROR_RESPONSE,
        errors: 'An internal server error occurred',
      });
      this.logManager.log('Error to create car', responseData);

      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(responseData);
    };
  }
}
