import { Inject, Injectable } from '@nestjs/common';
import { GetCarResponses } from 'src/car/domain/interfaces/get-car-interfaces';
import { CarRepository } from 'src/car/domain/repositories/car-repository';
import { LogManager } from 'src/common/domain/services/logger-service';

import { noop } from 'src/common/domain/utils/noop';

@Injectable()
export class GetCarService {
  constructor(
    @Inject(LogManager) private readonly logManager: LogManager,
    @Inject(CarRepository) private readonly carRepository: CarRepository,
  ) {
    this.logManager.setContext(this.constructor.name);
  }

  public onSuccess: (
    response: GetCarResponses.SuccessResponse,
  ) => Promise<any> = noop;

  public onError: (response: GetCarResponses.ErrorResponse) => Promise<any> =
    noop;

  async getCar(model?: string): Promise<void> {
    try {
      this.logManager.log('Starting command');

      const cars = await this.carRepository.get(model);

      this.logManager.log('Success to run command', { cars });

      return this.onSuccess({ cars });
    } catch (error: unknown) {
      this.logManager.error('Error to run command', { model, error });

      return this.onError();
    }
  }
}
