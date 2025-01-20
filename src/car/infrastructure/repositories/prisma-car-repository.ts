import { Injectable, Inject } from '@nestjs/common';

import { CarRepository } from 'src/car/domain/repositories/car-repository';
import { LogManager } from 'src/common/domain/services/logger-service';
import { DatabaseConnection } from 'src/common/infrastructure/database/prisma/database-connection';
import { CarEntity } from 'src/car/domain/entity/car-entity';

@Injectable()
export class PrismaCarRepository implements CarRepository {
  public constructor(
    @Inject(DatabaseConnection)
    private readonly database: DatabaseConnection,
    @Inject(LogManager) private readonly logManager: LogManager,
  ) {
    this.logManager.setContext(this.constructor.name);
  }

  public async get(modelName?: string): Promise<CarEntity[]> {
    const prisma = this.database;

    try {
      this.logManager.log('Trying to get cars', {
        modelName,
      });

      const cars = await prisma.car.findMany({
        where: { ...(modelName && { modelName }) },
      });

      this.logManager.log('Success to get cars', { cars });

      const carsEntities = cars.map((car) => new CarEntity(car));

      return carsEntities;
    } catch (error: unknown) {
      this.logManager.error('Error to get cars', {
        modelName,
        error,
      });
      throw new Error('Error to get cars');
    }
  }

  public async create(modelName: string): Promise<void> {
    const prisma = this.database;

    try {
      this.logManager.log('Trying to create car', {
        modelName,
      });

      await prisma.car.create({
        data: { modelName },
      });

      this.logManager.log('Success to create car', { modelName });
    } catch (error: unknown) {
      this.logManager.error('Error to create car', {
        modelName,
        error,
      });
      throw new Error('Error to create car');
    }
  }
}
