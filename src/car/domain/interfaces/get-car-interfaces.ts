import { CarEntity } from 'src/car/domain/entity/car-entity';

/* eslint-disable @typescript-eslint/no-namespace */
export enum GetCarErrorEnum {
  ERROR_RESPONSE,
}

export namespace GetCarResponses {
  export type SuccessResponse = { cars: CarEntity[] };
  export type ErrorResponse = void;
}
