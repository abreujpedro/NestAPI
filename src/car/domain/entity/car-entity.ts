import { NonFunctionProperties } from 'src/common/domain/utils/non-function-properties';

export class CarEntity {
  private readonly id?: number;

  private readonly modelName: string;

  public constructor(initProps: NonFunctionProperties<CarEntity>) {
    Object.assign(this, initProps);
  }

  public getModelName(): string {
    return this.modelName;
  }
}
