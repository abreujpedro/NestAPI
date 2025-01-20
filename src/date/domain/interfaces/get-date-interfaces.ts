/* eslint-disable @typescript-eslint/no-namespace */
export enum GetDateErrorEnum {
  ERROR_RESPONSE,
}

export namespace GetDateResponses {
  export type SuccessResponse = { date: Date };
  export type ErrorResponse = void;
}
