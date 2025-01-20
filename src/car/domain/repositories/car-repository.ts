import { Injectable } from '@nestjs/common';

import { CarEntity } from 'src/car/domain/entity/car-entity';

@Injectable()
export abstract class CarRepository {
  public abstract get(modelName?: string): Promise<CarEntity[]>;

  public abstract create(modelName: string): Promise<void>;
}
