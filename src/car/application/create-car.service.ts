import { Inject, Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

import { CreateCarResponses } from 'src/car/domain/interfaces/create-car-interfaces';
import { CarRepository } from 'src/car/domain/repositories/car-repository';
import { LogManager } from 'src/common/domain/services/logger-service';
import { noop } from 'src/common/domain/utils/noop';

@Injectable()
export class CreateCarService {
  constructor(
    @Inject(LogManager) private readonly logManager: LogManager,
    @Inject(CarRepository) private readonly carRepository: CarRepository,
    private eventEmitter: EventEmitter2,
  ) {
    this.logManager.setContext(this.constructor.name);
  }

  public onSuccess: (
    response: CreateCarResponses.SuccessResponse,
  ) => Promise<any> = noop;

  public onError: (response: CreateCarResponses.ErrorResponse) => Promise<any> =
    noop;

  async createCar(model?: string): Promise<void> {
    try {
      this.logManager.log('Starting command', { model });

      await this.carRepository.create(model);

      this.logManager.log('Success to create car', { model });

      this.eventEmitter.emit('car.created', { model });

      this.logManager.log('Success to run command', { model });

      return this.onSuccess();
    } catch (error: unknown) {
      this.logManager.error('Error to run command', { model, error });

      return this.onError();
    }
  }
}
