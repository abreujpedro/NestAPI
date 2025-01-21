import { Inject, Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { CarEntity } from 'src/car/domain/entity/car-entity';

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

  async createCar(model: string): Promise<void> {
    try {
      this.logManager.log('Starting command', { model });

      const car = new CarEntity({ modelName: model });

      await this.carRepository.create(car.getModelName());

      this.logManager.log('Success to create car', { car });

      this.eventEmitter.emit('car.created', car);

      this.logManager.log('Success to run command', { car });

      return this.onSuccess();
    } catch (error: unknown) {
      this.logManager.error('Error to run command', { model, error });

      return this.onError();
    }
  }
}
